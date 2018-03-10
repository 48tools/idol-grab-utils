const router = require('express-promise-router')()
const wdsService = require('../services/weidashang')
const liveService = require('../services/live')
const weiboService = require('../services/weibo')
const roomService = require('../api/pocket48')

const getConfig = (req) => {
  if (req.method === 'POST') return req.body
  else if (req.method === 'GET') return req.query

  return {}
}

router.get('/weidashang/:proId', async function(req, res) {
  const result = await wdsService.getProduct(req.params.proId)
  res.append('content-type', 'application/json')
  res.end(result)
})

router.get('/pocket/roomMsg/:roomId', async function(req, res) {
  const resp = await roomService.roomMsg(req.params.roomId)
  res.json(resp.data)
})

router.use('/pocket/memberLive', async function (req, res) {
  const resp = await liveService.getMemberLive(getConfig(req))

  res.json(resp.data)
})

router.get('/pocket/liveInfo/:liveId', async function(req, res) {
  const resp = await liveService.getLiveInfo(req.params.liveId)
  console.log(req.params)
  res.json(resp.data)
})

router.get('/weibo/:containerId', async function(req, res) {
  const resp = await weiboService.getWeibo(req.params.containerId)

  res.json(resp.data)
})

module.exports = router
