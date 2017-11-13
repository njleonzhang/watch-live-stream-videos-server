const errorCode = require('../util/errorCode').errorCode

module.exports = app => {

  const parseDataAndRefreshDB = async function (videoRoom,
    url, propertyMap, link, dataPath = 'data.data', errorPath = 'data.errno') {
    let result = await app.curl(url, {
      dataType: 'json',
      timeout: 3000
    })

    const error = errorPath
      .split('.')
      .reduce((obj, attr) => {
        return obj[attr]
      }, result)

    if (error === 0) {
      const data = dataPath
        .split('.')
        .reduce((obj, attr) => {
          return obj[attr]
        }, result)

      let attrs = {}
      for (const key in propertyMap) {
        if (propertyMap.hasOwnProperty(key)) {
          attrs[key] = propertyMap[key]
           .split('.')
           .reduce((obj, attr) => {
             return obj[attr]
           }, data)
        }
      }

      attrs.link = link

      await videoRoom.updateAttributes(attrs)
    }
  }

  class VideoRoom extends app.Service {
    async updateWithDetail(videoRoom, forceUpdate = false) {
      if (forceUpdate || (new Date() - new Date(videoRoom.updated_at)) / 1000 > 300) {
        switch (videoRoom.platform) {
          case 'douyu':
            await parseDataAndRefreshDB(
              videoRoom,

              `http://open.douyucdn.cn/api/RoomApi/room/${videoRoom.roomId}`,
              {
                online: 'online',
                screenShoot: 'room_thumb',
                hostName: 'owner_name',
                title: 'room_name',
              },
              `https://www.douyu.com/${videoRoom.roomId}`,
            )
            break;


          case 'panda':
            await parseDataAndRefreshDB(
              videoRoom,
              `http://www.panda.tv/api_room?roomid=${videoRoom.roomId}`,
              {
                online: 'roominfo.person_num',
                screenShoot: 'roominfo.pictures.img',
                hostName: 'hostinfo.name',
                title: 'roominfo.name'
              },
              `https://www.panda.tv/${videoRoom.roomId}`,
            )
            break;

          // other platform
        }
      }
    }

    async add({ platform, roomId = '', host = '' }) {
      try {
        let result = await this.ctx.model.VideoRoom.findOne({
          where: {
            platform,
            roomId
          }
        })

        if (result) {
          return result
        }
        result = await this.ctx.model.VideoRoom.quickCreate({
          platform,
          roomId,
          host
        })

        if (result) {
          await this.updateWithDetail(result, true)
          return result
        }
      } catch (e) {
        return errorCode.unKnownError
      }
    }
  }

  return VideoRoom
}
