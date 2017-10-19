import 'tslib';

import * as es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-unfetch';

import * as path from 'path';

import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

const PORT = parseInt(process.env.PORT) || 3000;

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(serve(path.join(__dirname, '../public')));
app.use(router.routes());

router.get('/healthcheck', (ctx) => {
  ctx.body = {};
});

app.listen(PORT, () => {
  console.log(`running in browser: ${process.env.BROWSER}`);
  console.log(`Listening on: http://localhost:${PORT}`);
});