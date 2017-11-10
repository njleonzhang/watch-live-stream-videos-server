const jsonRes = require('../util/responseBuilder').jsonRes

module.exports = app => {
  class VideoRoomCtl extends app.Controller {
    // async add() {
    //   const { app, ctx } = this
    //   console.log(ctx.request.body)
    //   const result = await ctx.service.videoRoom.add(ctx.request.body)
    //   ctx.body = jsonRes(result)
    // }
  }

  return VideoRoomCtl
}
