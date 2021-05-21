import { SvgToFontOptions } from 'svgtofont'

export type ExtendOptions = {
  fontTypes: string[]
}

export const defaultConfig: SvgToFontOptions & ExtendOptions = {
  src: './icons',
  dist: './fonts',
  css: {
    output: './css',
    cssPath: '../fonts/',
  },
  startUnicode: 0xea01,
  fontName: 'iconfont',
  fontTypes: ['ttf', 'woff', 'woff2'], // Font type define for font-face. Possible values: ttf, woff, woff2, svg, eot. *svg and ttf are generated even if there is no definition
  outSVGReact: true,
  outSVGPath: true,
  svgicons2svgfont: {
    normalize: true,
  },
}
