const jsonRes = require('../util/responseBuilder').jsonRes
const errorCode = require('../util/errorCode').errorCode

module.exports = (options, app) => {
  return async function getUser(ctx, next) {
    const id = ctx.session.id

    if (id) {
      let user = await app.model.User.findOne({
        where: {
          id
        }
      })

      ctx.user = user
      await next()
    } else {
      ctx.body = jsonRes(errorCode.userNotLogin)
    }
  }
}
