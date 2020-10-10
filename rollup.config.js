import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import path from 'path';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

/*
Note that these libraries are pinned until https://github.com/egoist/rollup-plugin-postcss/pull/325 has been merged into rollup-plugin-postcss

postcss
postcss-cli
postcss-import
postcss-mixins
postcss-nested
*/

const NAME = 'testUce'; // for umd

const { NODE_ENV = 'development' } = process.env;
const isProduction = NODE_ENV === 'production';
const INPUT_DIR = 'src';
const INPUT = `${INPUT_DIR}/index.ts`;
const OUTPUT_DIR = 'dist';
const BUNDLE_NAME = `${OUTPUT_DIR}/bundle.js`;
const DEV_PORT = 3000;
const FORMAT = 'umd';
const SOURCEMAP = isProduction ? false : 'inline';

export default {
  input: INPUT,

  output: {
    sourcemap: SOURCEMAP,
    format: FORMAT,
    name: NAME,
    file: BUNDLE_NAME,
  },

  plugins: [
    resolve(),

    postcss({
      extract: path.resolve('dist/app.css'),
      modules: true,
      plugins: [
        postcssImport,
        postcssNested,
        postcssMixins,
        postcssPresetEnv({
          autoprefixer,
          browsers: ['> 1%', 'last 2 versions', 'IE 11'],
        }),
      ],
      sourceMap: true,
    }),

    commonjs(),

    typescript(),

    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              chrome: '58',
              ie: '11',
            },
          },
        ],
      ],
    }),

    !isProduction &&
      serve({
        contentBase: [OUTPUT_DIR],
        port: DEV_PORT,
      }),

    !isProduction &&
      livereload({
        watch: [INPUT_DIR, OUTPUT_DIR],
      }),

    isProduction && terser(),

    isProduction && sizeSnapshot(),
  ].filter(Boolean),

  context: 'null',
  moduleContext: 'null',
};
