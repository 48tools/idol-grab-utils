const axios = require('axios')

const api = axios.create({
  timeout: 3000,
})

module.exports = api
