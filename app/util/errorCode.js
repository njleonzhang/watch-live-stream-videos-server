const errorCode = {
  OK: 'OK',
  userNotExist: 'userNotExist',
  errorPassword: 'errorPassword',
  unKnownError: 'unKnownError',
  userAlreadyExist: 'userAlreadyExist',
  roomAlreadyBind: 'roomAlreadyBind',
  userNotLogin: 'userNotLogin'
}

const codeMsg = {
  [errorCode.OK]: '成功',
  [errorCode.userNotExist]: '用户名或密码错误',
  [errorCode.errorPassword]: '错误的密码',
  [errorCode.unKnownError]: '未知错误',
  [errorCode.userAlreadyExist]: '用户已存在',
  [errorCode.roomAlreadyBind]: '您已经绑定过这个直播间了',
  [errorCode.userNotLogin]: '您没有登录'
}

module.exports = {
  errorCode,
  codeMsg
}
