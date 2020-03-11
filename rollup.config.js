
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/mp3tag.js',
  strictDeprecations: true,
  output: [{
    file: 'dist/mp3tag.js',
    format: 'umd',
    name: 'MP3Tag'
  }, {
    file: 'dist/mp3tag.min.js',
    format: 'umd',
    name: 'MP3Tag'
  }],
  plugins: [
    babel(),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ],
  watch: {
    include: ['src/**/*.js']
  }
}
