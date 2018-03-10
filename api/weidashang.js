const api = require('../api')
// const axios = require('axios')
const { WEIDASHANG } = require('../api/config')

module.exports = {
  getProduct(proId) {
    return api.post(WEIDASHANG.product, `pro_id=${proId}&client=2`)
  }
}
