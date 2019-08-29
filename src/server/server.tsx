import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
import * as fastifyStatic from 'fastify-static';
import * as fastifyCompress from 'fastify-compress';
import * as hyperid from 'hyperid';
import { routes, IRoute } from '../common/routes';
import { App } from '../common/app';

export function genReqId() {
  const instance = hyperid();
  return () => instance();
}

export function createServer() {
  const server = fastify({
    caseSensitive: false,
    ignoreTrailingSlash: true,
    logger: true,
    return503OnClosing: true,
    trustProxy: false,
    // genReqId: genReqId()
  });

  server.register(fastifyCompress, {});

  server.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/',
    wildcard: false,
  });

  server.get('/healthcheck', (req, reply) => {
    reply.send({});
  });

  const runtimeChunkContents = fs.readFileSync(
    path.join(__dirname, '../public/assets/runtime~app.js'),
    'utf8'
  );

  const manfiest = JSON.parse(fs.readFileSync(
    path.join(__dirname, '../public/manifest.json'),
    'utf8'
  ));

  server.get('*', async (req, reply) => {
    const url = req.raw.url;
    const currentRoute: IRoute = routes.find(route => matchPath(url, route)) || {};

    let data = currentRoute.fetchInitialData
        ? (await currentRoute.fetchInitialData())
        : null;

    const context: any = { data };

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      reply.redirect(context.url);
    } else {
      reply
        .code(context.status === 404 ? 404 : 200)
        .header('content-type', 'text/html; charset=utf-8')
        .send(`
<html>
    <head>
        <link rel="icon" href="/favicon.ico"/>
    </head>
    <body>
        <div id="root">${app}</div>
        <script>${runtimeChunkContents}</script>
        <script defer src="${manfiest['vendors.js']}"></script>
        <script defer src="${manfiest['app.js']}"></script>
    </body>
</html>`);
    }
  });

  return server;
}
