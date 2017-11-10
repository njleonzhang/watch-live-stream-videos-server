const jsonRes = require('../util/responseBuilder').jsonRes
const errorCode = require('../util/errorCode').errorCode
const _ = require('lodash')

module.exports = app => {
  class UserController extends app.Controller {
    async addVideoRoom() {
      const { app, ctx } = this
      const result = await ctx.service.user.addVideoRoom(ctx.request.body)
      ctx.body = jsonRes(result)
    }

    async getRooms() {
      const { app, ctx } = this

      let rooms = await ctx.user.getVideoRooms()
      ctx.body = await Promise.all(rooms.map(async room => {
        await ctx.service.videoRoom.updateWithDetail(room)

        return _.pick(room, [
          'id',
          'platform',
          'host',
          'roomId',
          'online',
          'screenShoot',
          'hostName',
          'title',
          'link'
        ])
      }))
    }
  }

  return UserController
}
