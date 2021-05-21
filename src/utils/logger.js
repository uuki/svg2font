const utils = require('./index')
const util = require('util')

module.exports = {
  error: (val) =>
    console.error(`[svg2font] ${utils.colors.red(util.format(val))}`),
  warn: (val) => console.warn(`[svg2font] ${utils.colors.yellow(val)}`),
  info: (val) => console.info(`[svg2font] ${utils.colors.cyan(val)}`),
  success: (val) => console.log(`[svg2font] ${utils.colors.green(val)}`),
  log: (val) => console.log(`[svg2font] ${val}`),
  raw: (val) => console.log(val),
}
