#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import yargs from 'yargs'
import svg2font from './'
import { logger } from './utils'
import { defaultConfig } from './config'

const OPTS = yargs
  .option('sources', {
    type: 'string',
    alias: 's',
    description: 'The root from which all sources are relative.',
  })
  .option('output', {
    type: 'string',
    alias: 'o',
    description: 'Output directory.',
  })
  .option('fontName', {
    type: 'string',
    alias: 'f',
    description: 'Font Name.',
  })
  .option('config', {
    type: 'string',
    alias: 'c',
    default: './svg2font.config.js',
    description:
      'Provide path to a svg2font configuration file e.g.\n./svg2font.config.json',
  })
  .option('help', {
    alias: 'h',
    type: 'boolean',
    description: 'Print help message',
  }).argv

const PATH_SOURCE = OPTS.sources ? path.join(process.cwd(), OPTS.sources) : ''
const PATH_OUTPUT = OPTS.output ? path.join(process.cwd(), OPTS.output) : ''
const PATH_CONFIG = path.join(process.cwd(), OPTS.config as string)

async function main() {
  let config = defaultConfig

  if (OPTS.config) {
    try {
      const extConfig = require(PATH_CONFIG)
      config = { ...config, ...extConfig }
    } catch (err) {
      logger.error(err)
    }
  }

  config.src = PATH_SOURCE || config.src
  config.dist = PATH_OUTPUT || config.dist
  config.fontName =
    (OPTS.fontName as string | undefined) ?? (config.fontName || 'iconfont')

  if (!fs.pathExistsSync(config.src as string)) {
    logger.error(`The directory does not exist! ${config.src}`)
    process.exit()
  }

  if (!fs.pathExistsSync(config.dist as string)) {
    fs.mkdirpSync(config.dist as string)
  }

  await svg2font(config)
}

main()
  .then(() => {
    logger.success('done!')
    process.exitCode = 0
  })
  .catch((err) => {
    logger.log(`Svg2Font:ERR:${err}`)
    process.exitCode = 1
  })
