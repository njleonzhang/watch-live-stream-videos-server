const jsonRes = require('../util/responseBuilder').jsonRes
const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class UserController extends app.Controller {
    async addVideoRoom() {
      const { app, ctx } = this
      const result = await ctx.service.user.addVideoRoom(ctx.request.body)
      ctx.body = jsonRes(result)
    }

    async getRooms() {
      let rooms = await this.ctx.user.getVideoRooms()
      this.ctx.body = rooms.map(({ id, platform, host, roomId }) => {
        return { id, platform, host, roomId }
      })
    }
  }

  return UserController
}