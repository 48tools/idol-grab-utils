const liveService = require('./services/live')
const roomService = require('./services/room')
const weiboService = require('./services/weibo')
const weidashangService = require('./services/weidashang')
const zhongchouService = require('./services/zhongchou')
const { pocket48 } = require('./config')
const apiInsts = require('./api/api-list')

module.exports = {
  liveService,
  roomService,
  weiboService,
  weidashangService,
  zhongchouService,
  pocket48,
  apiInsts,
}
