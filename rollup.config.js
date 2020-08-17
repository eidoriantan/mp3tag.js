
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const production = process.env.NODE_ENV === 'production'
const outputs = [{
  file: 'dist/mp3tag.js',
  format: 'umd',
  name: 'MP3Tag'
}]

if (production) {
  outputs.push({
    file: 'dist/mp3tag.min.js',
    format: 'umd',
    name: 'MP3Tag',
    plugins: terser()
  })
}

export default {
  input: 'src/mp3tag.mjs',
  strictDeprecations: true,
  output: outputs,
  plugins: [commonjs(), resolve(), babel({ babelHelpers: 'bundled' })],
  watch: { include: ['src/**/*.mjs'] }
}
