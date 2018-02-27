const { NODE_ENV } = process.env

const config = {
  presets: ['@babel/preset-typescript'],
  plugins: [],
}

if (NODE_ENV === 'test') {
  config.plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = config
