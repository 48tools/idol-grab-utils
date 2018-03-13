const md5 = require('blueimp-md5')

function signModianForm(form) {
  // 将键名取出按照升序排列，拼接成query string。 需要encode
  const querystring = form = Reflect.ownKeys(form).sort((a, b) => {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    }

    return 0
  }).map(key => `${key}=${encodeURIComponent(form[key])}`)
    .join('&')

  console.log(querystring)

  // 将qs 加上&p=das41aq6计算md5(16), 从第6位开始取16位
  return md5(form.concat('&p=das41aq6')).substr(5, 16)
}

module.exports = signModianForm
