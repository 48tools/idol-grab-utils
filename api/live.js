const axios = require('axios')
const mergeOptions = require('../helper/merge-options')
const { POCKET48 } = require('./config')

const api = axios.create({
  headers: {
    os: 'android',
    version: '5.0.1',
  }
})

const defaultMemberLiveOption = () => ({
  lastTime: 0,
  groupId: 0,
  type: 0,
  memberId: 0,
  giftUpdTime: new Date().getTime(),
  limit: 10,
})

const defaultOpenLiveOption = () => ({
  isReview: 0, // 0为直播
  lastTime: 0, // 毫秒时间戳
  groupId: 0, // 团id
  giftUpdTime: new Date().getTime(),
  limit: 10,
})


module.exports = {
  getOpenLive(config = {}) {
    return api.post(POCKET48.openLive, mergeOptions(defaultOpenLiveOption(), config))
  },
  getMemberLive(config = {}) {
    return api.post(POCKET48.memberLive, mergeOptions(defaultMemberLiveOption(), config))
  },
  getLiveInfo(liveId = '') {
    return api.post(POCKET48.liveDetail, {
      liveId
    })
  },
}
