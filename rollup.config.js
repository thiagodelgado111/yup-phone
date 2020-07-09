import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import typescript from '@wessberg/rollup-plugin-ts';
import filesize from 'rollup-plugin-filesize';
import analyze from 'rollup-plugin-analyzer';
import progress from 'rollup-plugin-progress';
import pkg from './package.json';

const commonWebConfig = {
  input: 'src/index.ts',
  external: ['yup'],
  output: {
    name: 'yupPhone',
    file: pkg.browser,
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    progress(),
    filesize(),
    analyze(),
    resolve({
      browser: true,
    }), // so Rollup can find `yup`
    commonjs({
      include: 'node_modules/**',
    }), // so Rollup can convert `yup` to an ES module
    typescript({
      transpiler: 'babel',
      babelConfig: '.babelrc',
    }),
  ],
};

// browser-friendly UMD build
const webConfig = commonWebConfig;

const webMinConfig = {
  ...commonWebConfig,
  output: {
    ...commonWebConfig.output,
    file: pkg.browser.replace(/(\.js)$/, '.min$1'), // yup-phone.umd.js → yup-phone.umd.min.js
  },
  plugins: [...commonWebConfig.plugins, compiler()],
};

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const nodeConfig = {
  input: 'src/index.ts',
  external: ['yup'],
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: 'inline' },
  ],
  plugins: [
    progress(),
    filesize(),
    analyze(),
    typescript({
      transpiler: 'babel',
      babelConfig: '.babelrc',
    }),
    compiler(),
  ],
};

export default process.env.NODE_ENV === 'test' ? nodeConfig : [webConfig, webMinConfig, nodeConfig];
