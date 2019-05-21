import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const { BUILD_ENV } = process.env;

const config = {
  input: 'index.ts',
  output: {
    name: 'loadScript',
  },
  plugins: [
    babel({
      extensions: ['.ts'],
      exclude: 'node_modules/**',
    }),
  ],
};

if (BUILD_ENV === 'production') {
  config.plugins.push(terser());
}

export default config;
