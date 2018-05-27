const { to } = require('await-to-js')
const logError = require('../helper/log-error')
const zhongchouApi = require('../api/modian.zhongchou')

const service = Object.keys(zhongchouApi).reduce(function(service, key) {
  if (key === 'wdsApi') return service

  service[key] = async function() {
    const [err, resp] = await to(zhongchouApi[key].apply(zhongchouApi[key], arguments))

    if (err) {
      return logError(err, {
        api: `Modian.zhongchou.${key}`
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
   * 获取众筹详情
   * @name getDetail
   * @param {String| Array<Number>} proIds
   * @returns {Promise<*>}
   */
  getDetail: service.getDetail,
  /**
   *
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {AxiosPromise<any>}
   */
  getRankings: service.getRankings,
  /**
   *
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {AxiosPromise<any>}
   */
  getOrders: service.getOrders,
}
