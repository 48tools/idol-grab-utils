const liveApi = require('../api/live')
const logError = require('../helper/log-error')
const { to } = require('await-to-js')

module.exports = {
  async getOpenLive(config = {}) {
    const [err, resp] = await to(liveApi.post(config))

    if (err) {
      return logError(err, {
        api: 'Pocket48.getOpenLive',
      })
    }

    return {
      ...resp.data,
      _code: 200,
    }
  },
  async getMemberLive(config = {}) {
    const [err, resp] = await to(liveApi.getMemberLive(config))

    if(err) {
      return logError(err, {
        api: 'Pocket48.getMemberLive'
      })
    }

    return {
      ...resp.data,
      _code: 200,
    }
  },
  async getLiveInfo(liveId = '') {
    const [err, resp] = await to(liveApi.getOpenLive(liveId))

    if (err) {
      return logError(err, {
        api: 'Pocket48.getLiveInfo'
      })
    }

    return {
      ...resp.data,
      _code: 200,
    }
  },
}
