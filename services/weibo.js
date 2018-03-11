const weiboApi = require('../api/weibo')
const logError = require('../helper/log-error')
const { to } = require('await-to-js')

module.exports = {
  async getWeibo(id) {
    const [err, resp] = await to(weiboApi.getWeibo(id))

    if (err) {
      return logError(err, {
        api: 'Weibo'
      })
    }

    return {
      ...resp.data,
      _code: 200,
    }
  }
}
