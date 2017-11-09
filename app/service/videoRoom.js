const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class VideoRoom extends app.Service {
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
          return result
        }
      } catch (e) {
        return errorCode.unKnownError
      }
    }
  }

  return VideoRoom
}