# svg2font

Webfont generater based on [jaywcjlove/svgtofont](https://github.com/jaywcjlove/svgtofont).

> Read a set of SVG icons and ouput a TTF/EOT/WOFF/WOFF2/SVG font, Generator of fonts from SVG icons.

[Install](#install) ·[Command](#using-with-command) · [Usage](#using-with-nodejs) ·[Scss mixin](#using-scss-mixin) ·[Options](#options)

## 3 changes

- selectable font type
- svg2font.config.js
- built-in scss mixin

## Install

```sh
yarn add @uuki/svg2font
```

#### Using With Command

```json
{
  "scripts": {
    "font": "svg2font --sources ./icons --output ./fonts --config ./svg2font.config.js"
  }
}
```

You can also configuration it by creating svg2font.config.js.

```js
module.exports = {
  src: './example/icons',
  dist: './example/fonts',
  fontName: 'iconfont',
  fontTypes: ['ttf', 'woff', 'woff2'],
  css: {
    output: './example/css',
    cssPath: '../fonts/',
    fontSize: '16px',
  },
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: false,
    fixedWidth: true,
  },
  svgoOptions: {
    multipass: true, // boolean. false by default
    datauri: 'enc', // 'base64', 'enc' or 'unenc'. 'base64' by default
    js2svg: {
      indent: 2, // string with spaces or number of spaces. 4 by default
    },
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeEditorsNSData',
      'cleanupAttrs',
      'mergeStyles',
      'inlineStyles',
      'minifyStyles',
      'cleanupIDs',
      'removeUselessDefs',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'convertEllipseToCircle',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'removeUnusedNS',
      'sortDefsChildren',
      'removeTitle',
      'removeDesc',
      { name: 'cleanupNumericValues', active: false },
      { name: 'removeViewBox', active: false },
      { name: 'mergePaths', active: false },
    ],
  },
  ...[more options](https://github.com/jaywcjlove/svgtofont#options)
}
```

\*Currently, website option is not supported.

#### Using With Nodejs

```js
const svg2font = require('@uuki/svg2font')
const path = require('path')

svg2font({
  src: path.resolve(process.cwd(), 'src/icons'), // svg path
  dist: path.resolve(process.cwd(), 'dist/fonts'), // output path
  fontName: 'iconfont', // font name
  css:
    output: './dist/css',
    cssPath: '../fonts/',
  }, // Create CSS files.
}).then(() => {
  console.log('done!')
})
```

#### Using scss mixin

```scss
@import 'path/to/iconfont';
```

```scss
/// @param {string} $filename - SVG name (no prefix)
/// @param {string} $insert - Pseudo class (default: before)
/// @param {bool} $extend - If you want to extend only the style for iconfont. (default: false)
///
@include icon('arrow-top');
```

## Options

Please refer to here [options](https://github.com/jaywcjlove/svgtofont#options)
