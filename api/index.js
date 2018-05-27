const axios = require('axios')

const api = axios.create({
  timeout: 10000,
})

module.exports = api
