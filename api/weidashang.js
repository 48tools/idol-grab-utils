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
  moxi_id: 0,
})

// proId: moxi_id
const moxiIds = {}

const setMoxiId = function(proId, moxiId) {
  if (moxiId) {
    moxiIds[proId] = moxiId
  }
}

const getMoxiId = async function(proId) {
  if (moxiIds[proId]) {
    return Promise.resolve(moxiIds[proId])
  }

  return apis.getProduct(proId).then(parseMoxiId)
}

function parseMoxiId(resp) {
  const { data } = resp

  try {
    return JSON.parse(data.data).pro_mess.moxi_post_id
  } catch(e) {
    return 0
  }
}

const apis = {
  wdsApi: api,
  getProduct(proId) {
    return api.post(WEIDASHANG.product, qs.stringify({
      pro_id: proId,
    })).then(function(resp) {
      setMoxiId(proId, parseMoxiId(resp))

      return resp
    })
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
  async getCommentList(proId, config = {}) {
    const moxi_id = await getMoxiId(proId)
    const data = qs.stringify(mergeOptions(defaultCommentOption(), config, {
      pro_id: proId,
      moxi_id,
    }))

    return api.post(WEIDASHANG.comment, data)
  },
}

module.exports = apis
