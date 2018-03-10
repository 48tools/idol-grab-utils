module.exports = {
  success(data) {
    return {
      status: 'success',
      code: 200,
      data,
    }
  },
  fail(error) {
    const msg = {
      status: 'fail',
    }

    if (error.response) {
      msg.data = error.response.data
      msg.reason = 'remote server error'
      msg.code = ''
    }
  }
}
