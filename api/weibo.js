const api = require('../index')
// const axios = require('axios')
const { WEIBO } = require('../api/config')

function getRealContainerId(raw) {
  if (raw.length < 15 && raw.indexOf('107603') !== 0) {
    return '107603'.concat(raw)
  }

  return raw
}

module.exports = {
  getWeibo(containerId) {
    return api.get(WEIBO, {
      params: {
        containerid: getRealContainerId(containerId)
      }
    })
  }
}
