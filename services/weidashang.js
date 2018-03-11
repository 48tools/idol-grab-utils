const { to } = require('await-to-js')
const logError = require('../api/')
const weidashang = require('../api/weidashang')

module.exports = {
  async getProduct(proId) {
    const [err, resp] = await to(weidashang.getProduct(proId))

    if (err) {
      return logError(err, {
        api: 'weidashang.getProduct',
      })
    }
    return { ...resp.data, _code: 200 }
  },
  async getBacker() {

  },
}
