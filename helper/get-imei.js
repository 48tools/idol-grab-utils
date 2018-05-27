module.exports = function () {
  const randomNum = function (minNum, maxNum) {

    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10)
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      default:
        return 0
    }
  }

  const r1 = 1000000 + randomNum(0, 8999999)
  const r2 = 1000000 + randomNum(0, 8999999)
  const input = `${r1}${r2}`
  let a = 0
  let b = 0
  for (let i = 0; i < input.length; i++) {
    const tt = parseInt(input.slice(i, i + 1))
    if (i % 2 === 0) {
      a = a + tt
    } else {
      const temp = tt * 2
      b = b + temp / 10 + temp % 10
    }
  }
  let last = Math.round((a + b) % 10)
  if (last === 0) {
    last = 0
  } else {
    last = 10 - last
  }

  return `${input}${last}`
}
