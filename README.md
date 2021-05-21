# svg2font

Webfont generater based on [jaywcjlove/svgtofont](https://github.com/jaywcjlove/svgtofont).

> Read a set of SVG icons and ouput a TTF/EOT/WOFF/WOFF2/SVG font, Generator of fonts from SVG icons.

[Install](#install) ·[Command](#using-with-command) · [Usage](#using-with-nodejs) ·[Options](#options)

## Install

```sh
yarn add uuki/svg2font
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
  },
  ...[more options](https://github.com/jaywcjlove/svgtofont#options)
}
```

\*Currently, website option is not supported.

#### Using With Nodejs

```js
const svg2font = require('uuki/svg2font')
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

## Options

Please refer to here [options](https://github.com/jaywcjlove/svgtofont#options)
