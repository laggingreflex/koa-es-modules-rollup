const Koa = require('koa');
const esModulesRollup = require('koa-es-modules-rollup');
const html = require('./client/static');

const app = new Koa();

app.use(esModulesRollup({
  root: __dirname + '/client',
}));

app.use(async ctx => ctx.body = html);

app.listen(3000, () => console.log('Listening on 3000'));
