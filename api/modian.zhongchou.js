const axios = require('../index')
const signForm = require('../helper/modian.sign')
const qs = require('querystring')
const mergeOptions = require('../helper/merge-options')
const { ZHONGCHOU } = require('./config')
const FormData = require('form-data')
const LRU = require('lru-cache')

const microCache = LRU({
  max: 6000,
  maxAge: 1000 * 10,
})

const setCache = function(config, data) {
  microCache.set(qs.stringify(config), data)
}

const getCache = function(config) {
  const key = qs.stringify(config)
  const cache = microCache.get(key)

  if (cache) {
    cache.data.fromCache = true

    // 摩点API缓存机制有问题， 这里缓存数据并不能解决问题，暂时先不提供缓存
    // return cache
  }

  return false
}

const getFormData = function(form) {
  const formData = new FormData()

  for (const key in form) {
    if (({}).hasOwnProperty.call(form, key)) {
      formData.append(key, form[key])
    }
  }

  return formData
}

const typeMap = {
  day: 2, // 打卡榜
  amount: 1, // 总额榜
}

const formatRankingConfig = function(...cfg) {
  const config = mergeOptions({
    page: 1,
    pro_id: 0,
    type: 2,
    _: new Date().getTime()
  }, ...cfg)

  if (typeMap[config.type]) {
    config.type = typeMap[config.type]
  }

  return config
}

module.exports = {
  /**
   * 获取众筹详情
   * @name getDetail
   * @param {String| Array<Number>} proId
   * @returns {AxiosPromise<any>}
   */
  getDetail(proId) {
    if (typeof proId === 'string')
      proId = decodeURIComponent(proId)
    else if (Array.isArray(proId)) {
      proId = proId.join(',')
    }

    const form = {
      pro_id: proId,
    }

    form.sign = signForm(form)

    const cache = getCache(form)
    if (cache) {
      return Promise.resolve(cache)
    }

    const formData = getFormData(form)

    return axios.post(ZHONGCHOU.detail, formData, {
      headers: formData.getHeaders()
    }).then(function(resp) {
      setCache(form, resp)

      return resp
    })
  },
  /**
   *
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {AxiosPromise<any>}
   */
  getRankings(proId, config = {}) {
    const form = formatRankingConfig(config, { pro_id: proId })
    form.sign = signForm(form)

    const cache = getCache(form)
    if (cache) {
      return Promise.resolve(cache)
    }

    const formData = getFormData(form)

    return axios.post(ZHONGCHOU.backerRank, formData, {
      headers: formData.getHeaders()
    }).then(function(resp) {
      setCache(form, resp)

      return resp
    })
  },
  /**
   *
   * @param {String|Number} proId
   * @param {Object} config
   * @returns {AxiosPromise<any>}
   */
  getOrders(proId, config = {}) {
    const form = mergeOptions({ pro_id: 0, page: 1 }, config, { pro_id: proId })
    form.sign = signForm(form)

    const cache = getCache(form)
    if (cache) {
      return Promise.resolve(cache)
    }

    const formData = getFormData(form)

    return axios.post(ZHONGCHOU.orders, formData, {
      headers: formData.getHeaders()
    }).then(function(resp) {
      setCache(form, resp)

      return resp
    })
  }
}
