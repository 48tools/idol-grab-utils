const axios = require('axios')
const signForm = require('../helper/modian.sign')
const mergeOptions = require('../helper/merge-options')
const { ZHONGCHOU } = require('./config')


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

const formatRankingConfig = function(cfg) {
  cfg = mergeOptions({
    page: 1,
    pro_id: 0,
    type: 2
  }, cfg)
}

module.exports = {
  /**
   * 获取众筹详情
   * @name getDetail
   * @param proIds
   * @returns {AxiosPromise<any>}
   */
  getDetail(proIds) {
    proIds = decodeURIComponent(proIds)

    const form = {
      pro_id: proIds,
    }

    form.sign = signForm(form)

    return axios.post(ZHONGCHOU.detail, getFormData(form))
  },
  getRankings(config) {

  }
}
