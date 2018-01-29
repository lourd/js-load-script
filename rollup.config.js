const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const { BUILD_ENV } = process.env

const config = {
  input: 'index.js',
  output: {
    name: 'loadScript',
  },
  plugins: [resolve()],
}

if (BUILD_ENV === 'production') {
  config.plugins.push(uglify())
}

module.exports = config
