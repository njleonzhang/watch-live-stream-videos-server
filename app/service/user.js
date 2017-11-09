const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class User extends app.Service {
    async addVideoRoom({ platform, roomId, host }) {
      try {
        let user = await this.ctx.model.User.findOne({
          where: {
            id: this.ctx.session.id
          }
        })
        let room = await this.ctx.service.videoRoom.add({ platform, roomId, host })
        let result = await room.addUser(user)
        if (result.length > 0) {
          return errorCode.OK
        } else {
          return errorCode.roomAlreadyBind
        }
      } catch (e) {
        return errorCode.unKnownError
      }
    }
  }

  return User
}