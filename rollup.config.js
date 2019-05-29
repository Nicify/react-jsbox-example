import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import replace from 'rollup-plugin-modify'
import cleanup from 'rollup-plugin-cleanup'
import copy from 'rollup-plugin-copy-assets'
import progress from 'rollup-plugin-progress'
import {existsSync, mkdirSync, openSync, closeSync} from 'fs'
import {dirname} from 'path'
import pkg from './package.json'

export const mkdirp = path => {
  if (existsSync(path)) {
    return
  }
  const parentDir = dirname(path)
  if (!existsSync(parentDir)) {
    mkdirp(parentDir)
  }
  mkdirSync(path)
}

export default [
  {
    input: 'src/main.js',
    treeshake: true,
    external: ['react'],
    output: [{dir: 'dist', format: 'cjs', strict: false}], // set strict to false in JSBox
    plugins: [
      progress({
        clearLine: true
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      resolve({
        // jsnext: true,
        dedupe: ['react']
      }),
      babel({
        extensions: ['.js'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**', /\/core-js\//],
        presets: pkg.babel.presents,
        plugins: pkg.babel.plugins
      }),
      commonjs(),
      terser(),
      cleanup(),
      copy({
        assets: ['src/assets', 'src/strings', 'src/config.json', 'src/README.MD']
      }),

      // Create an empty app.js script in scripts directory
      {
        name: 'fix',
        buildEnd(err) {
          if (err) return
          mkdirp('dist/scripts')
          closeSync(openSync('dist/scripts/app.js', 'w'))
        }
      }
    ]
  }
]
