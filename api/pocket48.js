const axios = require('axios')
const { POCKET48_WITH_TOKEN } = require('../api/config')
const { IMEI, pocket48 } = require('../config')

const headers = {
  'version': '5.0.1',
  'os': 'android',
  'Accept-Encoding': 'gzip',
  'User-Agent': 'Mobile_Pocket',
  'Connection': 'Keep-Alive',
  IMEI,
  'Content-Type': 'application/json;charset=utf-8',
}

const api = axios.create({
  headers,
  timeout: 2000,
})

const apis = {
  _token: '',
  login() {
    return api.post(POCKET48_WITH_TOKEN.login, {
      ...pocket48,
      latitude: 0,
      longitude: 0,
    })
  },
  roomMsg(roomId) {
    return api.post(POCKET48_WITH_TOKEN.room, {
      lastTime: 0,
      limit: 15,
      chatType: 0,
      roomId,
    })
  }
}

Object.defineProperty(api.defaults.headers.common, 'token', {
  enumerable: true,
  get() {
    return apis._token
  }
})

module.exports = apis
