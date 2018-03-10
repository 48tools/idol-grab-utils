const weidashang = require('../api/weidashang')

module.exports = {
  async getProduct(proId) {
    const { data } = await weidashang.getProduct(proId)
    return data.data
  },
  async getBacker() {

  },
}
