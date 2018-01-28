const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')

const env = process.env.BUILD_ENV

const config = {
  input: 'index.js',
  output: {
    name: 'loadScript',
  },
  plugins: [resolve()],
}

if (env === 'production') {
  config.plugins.push(uglify())
}

module.exports = config
