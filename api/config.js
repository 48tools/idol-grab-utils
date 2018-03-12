const wdsPrefix = 'http://orderapi.modian.com/wds_v21_5/product/'
const liveApiPrefix = 'https://plive.48.cn/livesystem/api/live/v1/'
const pocketUserApiPrefix = 'https://puser.48.cn/usersystem/api/user/v1/'
const pockerIMApiPrefix = 'https://pjuju.48.cn/imsystem/api/im/v1/'

module.exports = {
  WEIBO: 'https://m.weibo.cn/api/container/getIndex', // GET
  WEIDASHANG: { // all POST
    product: wdsPrefix, // POST,
    backer: `${wdsPrefix}backer_list`, // 最新支持者列表
    backerRank: `${wdsPrefix}backer_ranking_list`,
    comment: `${wdsPrefix}comment_list` // 评论列表
  },
  ZHONGCHOU: {

  },
  POCKET48: { // all POST
    openLive: `${liveApiPrefix}openLivePage`, // 公演
    memberLive: `${liveApiPrefix}memberLivePage`, // 成员直播
    liveDetail: `${liveApiPrefix}getLiveOne`, // 直播详情
  },
  POCKET48_WITH_TOKEN: {
    login: `${pocketUserApiPrefix}login/phone`,
    card: `${pocketUserApiPrefix}show/cardInfo`,
    room: `${pockerIMApiPrefix}member/room/message/mainpage`
  },
}
