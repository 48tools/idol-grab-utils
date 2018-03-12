const { to } = require('await-to-js')
const logError = require('../helper/log-error')
const wdsApi = require('../api/weidashang')

const service = Object.keys(wdsApi).reduce(function(service, key) {
  service[key] = async function() {
    const [err, resp] = await to(wdsApi[key].apply(wdsApi[key], arguments))

    if (err) {
      return logError(err, {
        api: `Modian.weidashang.${key}`
      })
    }

    return {
      ...resp.data,
      _code: 200,
    }
  }

  return service
}, {})

module.exports = {
  /**
   * getProduct
   * @param {String|Number} proId
   * @returns {Promise<*>}
   */
  getProduct: service.getProduct,
  /**
   * getCommentList
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {Promise<*>}
   */
  getCommentList: service.getCommentList,
  /**
   * getBackerList
   * @param {String|Number} proId
   * @returns {Promise<*>}
   */
  getBackerList: service.getBackerList,
  /**
   * getBackerRankingList
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {Promise<*>}
   */
  getBackerRankingList: service.getBackerRankingList,
}
