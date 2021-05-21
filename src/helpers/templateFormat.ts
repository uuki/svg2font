type FontFace = {
  types: string[]
  name: string
  timestamp: Number
  cssPath: string
}

interface ITypeFormat {
  [key: string]: string
  eot: string
  woff: string
  woff2: string
  ttf: string
  svg: string
}

const typeOrder = ['eot', 'woff2', 'woff', 'ttf', 'svg']

export const cssFontFaceFormat = (options: FontFace) => {
  const types = options.types.sort(
    (a, b) => typeOrder.indexOf(a) - typeOrder.indexOf(b)
  )
  const format: ITypeFormat = {
    eot: `url('${options.cssPath}${options.name}.eot?t=${options.timestamp}#iefix') format('embedded-opentype')/* IE6-IE8 */`,
    woff: `url("${options.cssPath}${options.name}.woff?t=${options.timestamp}") format("woff")`,
    woff2: `url("${options.cssPath}${options.name}.woff2?t=${options.timestamp}") format("woff2")`,
    ttf: `url('${options.cssPath}${options.name}.ttf?t=${options.timestamp}') format('truetype')/* chrome, firefox, opera, Safari, Android, iOS 4.2+*/`,
    svg: `url('${options.cssPath}${options.name}.svg?t=${options.timestamp}#{{fontname}}') format('svg')/* iOS 4.1- */`,
  }

  return `@font-face {
  font-family: '${options.name}';
  ${
    types.includes('eot')
      ? `src: url('${options.cssPath}${options.name}.eot?t=${options.timestamp}'); /* IE9*/`
      : ''
  }
  src: ${types.map((type) => format[type]).join(',\n')};
}`
}

export const cssStrFormat = (name: string, code: string, prefix?: string) =>
  `.${prefix}-${name}:before { content: "\\${code}"; }`

export const cssVarFormat = (name: string, code: string, prefix?: string) =>
  `$${prefix}-${name}: "\\${code}";`

export const cssVarArrFormat = (name: string, code: string) =>
  `  ${name}: "\\${code}",`
