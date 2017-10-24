const errorCode = require('../util/errorCode').errorCode

module.exports = app => {
  class User extends app.Service {
    async login({ userName, password }) {
      try {
        const user = await this.ctx.model.User.findOne({
          where: {
            userName
          },
          attributes: ['userName', 'password', 'id']
        })
        const result = await user.comparePassword(password)
        if (result) {
          this.ctx.session = {
            id: result.id
          }
          return errorCode.OK
        }
        this.ctx.session = null
        return errorCode.errorPassword
      } catch (e) {
        this.ctx.session = null
        return errorCode.userNotExist
      }
    }

    async register({ userName, password }) {
      try {
        const result = await this.ctx.model.User.create({
          userName,
          password
        })

        if (result) {
          return errorCode.OK
        } else {
          return errorCode.unKnownError
        }
      } catch (e) {
        return errorCode.userAlreadyExist
      }
    }
  }

  return User
}