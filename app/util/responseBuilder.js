const codeMsg = require('./errorCode').codeMsg

const jsonRes = function(code, data) {
  let res = {
    code,
    msg: codeMsg[code]
  }

  if (res.msg === undefined) {
    throw `no error code: ${code}`
  }

  if (data) {
    res.data = data
  }

  return res
}

module.exports = {
  jsonRes
}