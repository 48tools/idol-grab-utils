const errors = []

module.exports = function logError(errInst, mergeInfo) {
  const err = {
    status: 500,
    api: '',
    _code: 500,
    ...mergeInfo
  }

  err.message = [errInst.message ? errInst.message : '服务器出错']

  if (mergeInfo.message) {
    err.message.push(mergeInfo.message)
  }

  errors.shift(err)

  return err
}
