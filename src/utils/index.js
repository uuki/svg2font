module.exports = {
  get colors() {
    return require('colors-cli')
  },
  get logger() {
    return require('./logger')
  },
  get isObject() {
    return require('./is-object')
  },
}
