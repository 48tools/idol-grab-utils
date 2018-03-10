module.exports = function mergeOptions(target) {
  const args = [].slice.call(arguments)
  args.shift()

  if (args.length === 0) return target

  for (let i = 0; i < args.length; i++) {
    const keys = Object.keys(args[i])

    for (let j = 0; j < keys.length; j++) {
      if ({}.hasOwnProperty.call(target, keys[j])) {
        target[keys[j]] = args[i][keys[j]]
      }
    }
  }

  return target
}
