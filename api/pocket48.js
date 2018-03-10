const axios = require('axios')
const { to } = require('await-to-js')
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
  _token: 'dviVGZt3Pni/bKZPnfoHd5fawqzc5kn4C3i+XjV9IdfcuqZZYZvEHHCxaD3fTVRfOY4eAF9ifbM=',
  async login() {
    const [err, resp] = await to(api.post(POCKET48_WITH_TOKEN.login, {
      ...pocket48,
      latitude: 0,
      longitude: 0,
    }))

    if (!err) {
      return resp.data
    }

    return err
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

console.log('token', api.defaults.headers.common.token)

module.exports = apis

apis.login().then(function(it) {
  console.log(it)
})
