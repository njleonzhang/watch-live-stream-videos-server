const jsonRes = require('../util/responseBuilder').jsonRes

module.exports = app => {
  class UserController extends app.Controller {
    async addVideoRoom() {
      const { app, ctx } = this
      const result = await ctx.service.user.addVideoRoom(ctx.request.body)
      ctx.body = jsonRes(result)
    }
  }

  return UserController
}