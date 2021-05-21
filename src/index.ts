import path from 'path'
import { SvgToFontOptions } from 'svgtofont'
import {
  createSVG,
  createEOT,
  createTTF,
  createWOFF,
  createWOFF2,
  // createHTML,
  CSSOptions,
  copyTemplate,
  createTypescript,
} from 'svgtofont/lib/utils'
import { colors } from './utils'
import {
  generateIconsSource,
  generateReactIcons,
} from 'svgtofont/lib/generate'
import {
  cssFontFaceFormat,
  cssStrFormat,
  cssVarFormat,
  cssVarArrFormat,
} from './helpers/templateFormat'
import { ExtendOptions, defaultConfig } from './config'
import logger from './utils/logger'

interface IGenerator {
  [key: string]: Function
  woff: Function
  woff2: Function
  eot: Function
}

async function creatFont(options: SvgToFontOptions & ExtendOptions) {
  options.dist =
    options.dist || path.join(process.cwd(), defaultConfig.dist as string)
  options.src =
    options.src || path.join(process.cwd(), defaultConfig.src as string)
  options.startUnicode = options.startUnicode || defaultConfig.startUnicode
  options.svg2ttf = options.svg2ttf || {}
  options.emptyDist = options.emptyDist
  options.fontName = options.fontName || defaultConfig.fontName || 'iconfont'
  options.fontTypes = options.fontTypes || defaultConfig.fontTypes
  options.svgicons2svgfont = options.svgicons2svgfont || {}
  options.svgicons2svgfont.fontName = options.fontName
  options.classNamePrefix = options.classNamePrefix || options.fontName

  const cssString = [] as string[]
  const cssVars = [] as string[]
  const cssVarArr = [] as string[]

  const fontSize: string =
    options.css && typeof options.css !== 'boolean' && options.css.fontSize
      ? options.css.fontSize
      : '16px'
  const unicodeObject = await createSVG(options)
  const ttf = await createTTF(options)
  const generatorTypes = {
    woff: createWOFF,
    woff2: createWOFF2,
    eot: createEOT,
  } as IGenerator

  Object.keys(unicodeObject).forEach((name) => {
    const _code = unicodeObject[name]
    const hexadecimalCode = _code.charCodeAt(0).toString(16)

    cssString.push(
      cssStrFormat(name, hexadecimalCode, options.classNamePrefix)
    )
    cssVars.push(cssVarFormat(name, hexadecimalCode, options.classNamePrefix))
    cssVarArr.push(cssVarArrFormat(name, hexadecimalCode))
  })

  /**
   * Generate Fonts
   */
  await Promise.all(
    options.fontTypes.map(async (type) => {
      const generator = generatorTypes[type]

      if (generator) {
        return await generator(options, ttf)
      }
      return
    })
  )

  /**
   * Optional CSS
   */
  if (options.css) {
    const cssOptions: CSSOptions | null =
      typeof options.css !== 'boolean' && options.css ? options.css : null

    const cssDist = cssOptions?.output ?? options.dist
    const cssPath = cssOptions?.cssPath ?? ''
    const styleTemp = path.resolve(__dirname, 'template')
    const timeStamp = new Date().getTime()

    return copyTemplate(styleTemp, cssDist, {
      cssFontFace: cssFontFaceFormat({
        types: options.fontTypes,
        name: options.fontName,
        timestamp: timeStamp,
        cssPath,
      }),
      fontname: options.fontName,
      cssString: cssString.join('\n'),
      cssVars: cssVars.join('\n'),
      cssVarArr: cssVarArr.join('\n'),
      fontSize,
      timestamp: new Date().getTime(),
      prefix: options.classNamePrefix || options.fontName,
      _opts: typeof options.css === 'boolean' ? {} : { ...options.css },
    })
  }

  /**
   * Optional TS
   */
  if (options.typescript) {
    await createTypescript({ ...options, typescript: options.typescript })
  }

  /**
   * Optional outSVGPath
   */
  if (options.outSVGPath) {
    const outPath = await generateIconsSource(options)
    console.log(`${colors.green('SUCCESS')} Created ${outPath} `)
  }

  /**
   * Optional outSVGReact
   */
  if (options.outSVGReact) {
    await generateReactIcons(options)
    console.log(`${colors.green('SUCCESS')} Created React Components. `)
  }
}

export default async (options: SvgToFontOptions & ExtendOptions) => {
  try {
    await creatFont(options)
  } catch (err) {
    logger.error(`Svg2Font:CLI:ERR:${err}`)
  }
}
