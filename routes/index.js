const router = require('express-promise-router')()
const wdsService = require('../services/weidashang')
const zhongchouService = require('../services/zhongchou')
const liveService = require('../services/live')
const weiboService = require('../services/weibo')
const roomService = require('../api/pocket48')

const getConfig = (req) => {
  if (req.method === 'POST') return req.body
  else if (req.method === 'GET') return req.query

  return {}
}

router.use('/zhongchou/detail', async function(req, res) {
  res.json(await zhongchouService.getDetail(getConfig(req).pro_id))
})

router.use('/zhongchou/:proId/rankings', async function(req, res) {
  res.json(await zhongchouService.getRankings(req.params.proId, getConfig(req)))
})

router.use('/zhongchou/:proId/orders', async function(req, res) {
  res.json(await zhongchouService.getOrders(req.params.proId, getConfig(req)))
})

router.use('/weidashang/:proId/backerList', async function (req, res) {
  res.json(await wdsService.getBackerList(req.params.proId))
})

router.use('/weidashang/:proId/backerRankingList', async function (req, res) {
  res.json(await wdsService.getBackerRankingList(req.params.proId, getConfig(req)))
})

router.use('/weidashang/:proId/commentList', async function (req, res) {
  res.json(await wdsService.getCommentList(req.params.proId, getConfig(req)))
})

router.use('/weidashang/:proId', async function(req, res) {
  res.json(await wdsService.getProduct(req.params.proId))
})

router.use('/pocket/roomMsg/:roomId', async function(req, res) {
  res.json(await roomService.roomMsg(req.params.roomId))
})

router.use('/pocket/memberLive', async function (req, res) {
  res.json(await liveService.getMemberLive(getConfig(req)))
})

router.use('/pocket/liveInfo/:liveId', async function(req, res) {
  res.json(await liveService.getLiveInfo(req.params.liveId))
})

router.use('/weibo/:containerId', async function(req, res) {
  res.json(await weiboService.getWeibo(req.params.containerId))
})

module.exports = router
