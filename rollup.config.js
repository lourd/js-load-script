import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const { BUILD_ENV } = process.env

const config = {
  input: 'index.ts',
  output: {
    name: 'loadScript',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}

if (BUILD_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
