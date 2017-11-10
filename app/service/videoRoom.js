const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class VideoRoom extends app.Service {
    async updateWithDetail(videoRoom, forceUpdate = false) {
      if (forceUpdate || (new Date() - new Date(videoRoom.updated_at)) / 1000 > 300) {
        switch (videoRoom.platform) {
          case 'douyu':
            let result = await app.curl(`http://open.douyucdn.cn/api/RoomApi/room/${videoRoom.roomId}`, {
              dataType: 'json',
              timeout: 3000
            })

            const { data, error } = result.data

            if (error === 0) {
              videoRoom.updateAttributes({
                online: data.online,
                screenShoot: data.room_thumb,
                hostName: data.owner_name,
                title: data.room_name,
                link: `https://www.douyu.com/${videoRoom.roomId}`
              })
            }

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
