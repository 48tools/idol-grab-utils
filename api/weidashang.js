const axios = require('axios')
const mergeOptions = require('../helper/merge-options')
const { WEIDASHANG } = require('../api/config')
const { IMEI } = require('../config')
const qs = require('querystring')

const api = axios.create({
  headers: {
    IMEI,
    version: '2.1.5',
    client: 2,
    device: 'OnePlus 3',
    host: 'orderapi.modian.com',
  }
})

const defaultBackerOption = () => ({
  pro_id: 0,
  user_id: 0,
  page_index: 0,
  page_rows: 20,
  type: 'day', // day | amount ， 打卡榜 | 聚聚榜
})

const defaultCommentOption = () => ({
  pro_id: 0,
  user_id: 0,
  page_index: 0,
  page_rows: 10,
})

module.exports = {
  getProduct(proId) {
    return api.post(WEIDASHANG.product, qs.stringify({
      pro_id: proId,
    }))
  },
  getBackerList(proId) {
    return api.post(WEIDASHANG.backer, qs.stringify({
      pro_id: proId,
    }))
  },
  getBackerRankingList(proId, config = {}) {
    return api.post(WEIDASHANG.backerRank, qs.stringify(mergeOptions(defaultBackerOption(), config, {
      pro_id: proId,
    })))
  },
  getCommentList(proId, config = {}) {
    return api.post(WEIDASHANG.comment, qs.stringify(mergeOptions(defaultCommentOption(), config, {
      pro_id: proId,
    })))
  },
}
