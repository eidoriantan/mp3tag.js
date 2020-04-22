
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/mp3tag.mjs',
  strictDeprecations: true,
  output: [{
    file: 'dist/mp3tag.js',
    format: 'umd',
    name: 'MP3Tag'
  }, {
    file: 'dist/mp3tag.min.js',
    format: 'umd',
    name: 'MP3Tag',
    plugins: terser()
  }],
  plugins: [
    commonjs(),
    resolve(),
    babel()
  ],
  watch: {
    include: ['src/**/*.mjs']
  }
}
