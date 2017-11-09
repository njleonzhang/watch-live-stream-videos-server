const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('user', {
    userName: {
      type: STRING,
      unique: true
    },
    cellphone: {
      type: STRING,
      unique: true
    },
    idNumber: {
      type: STRING,
      unique: true
    },
    password: STRING,
    created_at: DATE,
    updated_at: DATE
  })

  User.prototype.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        // 此处需要处理
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(isMatch)
      })
    })
  }

  User.beforeCreate((user, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log('Error while generating bcrypt salt.')
          console.log(err)
          reject(err)
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
          if (err) {
            console.log('Error while generating bcrypt hash.')
            console.log(err)
            reject(err)
          }
          user.password = hash
          resolve()
        })
      })
    })
  })
  
  return User
}