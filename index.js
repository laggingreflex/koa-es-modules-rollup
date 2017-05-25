const Path = require('path');
const { rollup } = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const debug = require('debug')('koa-es-modules-rollup');

const mandate = reason => { throw new Error(reason) }

const cache = {};

module.exports = ({
  root = mandate('Root is required'),
  ext = ['js'],
} = {}) => async(ctx, next) => {

  if (ctx.method !== 'GET') {
    debug('Not processing', ctx.url, 'method!=GET');
    return next();
  }

  if (ext.indexOf(ctx.url.substr(-2)) == -1) {
    debug('Not processing', ctx.url, 'ext!=' + ext);
    return next();
  }

  const path = Path.join(root, ctx.url);

  if (!cache[path] && !exists(path)) {
    debug('Not processing', ctx.url, '!exists', path);
    return next();
  }

  debug('Processing', ctx.url, '=>', path);

  const bundle = cache[path] = await rollup({
    entry: path,
    format: 'iife',
    plugins: [
      resolve({ jsnext: true, main: true }),
      commonjs(),
    ],
    cache: cache[path],
  });

  debug('Bundle generated');

  const result = bundle.generate({
    format: 'cjs',
  });

  debug('Responding with generated code', result.code.length, 'bytes');

  ctx.body = result.code;
};

function exists(path) {
  try {
    return require.resolve(path);
  } catch (noop) {}
}
