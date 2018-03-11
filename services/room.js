const roomApi = require('../api/pocket48')
const logError = require('../helper/log-error')
const { to } = require('await-to-js')
const { pocket48 } = require('../config')

let refreshTokenTimeout = null
// let retryCount = 0
// const maxTryCount = 5

const roomService = {
  async refreshToken({ account, password } = {}) {
    clearTimeout(refreshTokenTimeout)
    refreshTokenTimeout = setTimeout(roomService.refreshToken, 1000 * 60 * 60 * 24) // 每天更新一次token
    if (account) {
      pocket48.account = account
    }
    if (password) {
      pocket48.password = password
    }

    const [err, resp] = await to(roomApi.login())

    if (err) {
      logError(err, {
        api: 'Pocket48.login'
      })
      return false
    }

    const { data } = resp

    if (data.status !== 200) {
      // wrong param
      console.log('wrong account or password')
      return false
    } else {
      roomApi._token = data.content.token

      return true
    }
  },
  async roomMsg(roomId) {
    if (!roomApi._token) {
      console.log('try login')
      await roomService.refreshToken()
    }
    const [err, resp] = await to(roomApi.roomMsg(roomId))

    if (err) {
      return {
        status: 500,
        message: err.message || '服务器发生错误',
        responseData: resp ? resp.data : {},
        api: 'Pocket48.roomMsg',
      }
    }

    return {
      ...resp.data,
      _code: 200,
    }
  }
}

module.exports = roomService
