const jsonRes = require('../util/responseBuilder').jsonRes
const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class AuthController extends app.Controller {
    async login() {
      const { app, ctx } = this
      const result = await ctx.service.auth.login(ctx.request.body)
      ctx.body = jsonRes(result)
    }

    async register() {
      const { app, ctx } = this
      const result = await ctx.service.auth.register(ctx.request.body)
      ctx.body = jsonRes(result)
    }

    async logout() {
      const { ctx } = this
      ctx.session = null
      ctx.body = jsonRes(errorCode.OK)
    }
  }

  return AuthController
}
