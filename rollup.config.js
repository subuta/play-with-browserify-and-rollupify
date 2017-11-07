// rollup.config.js
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const {minify} = require('uglify-es')

let plugins = [
  resolve(),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'react': ['Component', 'createFactory', 'createElement']
    }
  }),
  babel({
    babelrc: false,
    exclude: [
      '!node_modules/@hocs',
      'node_modules/**'
    ], // only transpile our source code
    'presets': [
      ['es2015', {modules: false}],
      'stage-2',
      'react'
    ],
    'plugins': [
      'external-helpers',
      'transform-react-jsx',
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }]
    ]
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins = [...plugins, uglify({}, minify)]
}

module.exports = {
  format: 'iife',
  plugins
}
