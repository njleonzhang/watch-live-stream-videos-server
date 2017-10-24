const errorCode = {
  OK: 'OK',
  userNotExist: 'userNotExist',
  errorPassword: 'errorPassword',
  unKnownError: 'unKnownError',
  userAlreadyExist: 'userAlreadyExist'
}

const codeMsg = {
  [errorCode.OK]: '成功',
  [errorCode.userNotExist]: '用户名或密码错误',
  [errorCode.errorPassword]: '错误的密码',
  [errorCode.unKnownError]: '未知错误',
  [errorCode.userAlreadyExist]: '用户已存在'
}

module.exports = {
  errorCode,
  codeMsg
}