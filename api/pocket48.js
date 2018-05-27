const axios = require('axios')
const mergeOptions = require('../helper/merge-options')
const { POCKET48_WITH_TOKEN } = require('../api/config')
const { pocket48 } = require('../config')
const getImei = require('../helper/get-imei')

const headers = {
  'version': '5.0.1',
  'os': 'android',
  'Accept-Encoding': 'gzip',
  'User-Agent': 'Mobile_Pocket',
  'Connection': 'Keep-Alive',
  'Content-Type': 'application/json;charset=utf-8',
}

const api = axios.create({
  headers,
  timeout: 2000,
})

api.interceptors.request.use(function(config) {
  config.headers.imei = getImei()

  return config
})

const apis = {
  _token: '',
  pocket48Api: api,
  login() {
    return api.post(POCKET48_WITH_TOKEN.login, {
      ...pocket48,
      latitude: 0,
      longitude: 0,
    })
  },
  roomMsg(roomId, config) {
    return api.post(POCKET48_WITH_TOKEN.room, mergeOptions({
      lastTime: 0,
      limit: 15,
      chatType: 0,
      roomId,
    }, config))
  }
}

Object.defineProperty(api.defaults.headers.common, 'token', {
  enumerable: true,
  get() {
    return apis._token
  }
})

module.exports = apis
