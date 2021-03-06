import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager  } from '@loadable/server';
import { Helmet } from 'react-helmet';
import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
import * as fastifyStatic from 'fastify-static';
import * as fastifyCompress from 'fastify-compress';
import * as fastifyEtag from 'fastify-etag';
import * as hyperid from 'hyperid';
import { routes, IRoute } from '../common/routes';

const production = process.env.NODE_ENV === 'production';
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function genReqId() {
  const instance = hyperid();
  return () => instance();
}

export function createServer(): Promise<fastify.FastifyInstance>{
  const server = fastify({
    caseSensitive: false,
    ignoreTrailingSlash: true,
    logger: true,
    return503OnClosing: true,
    trustProxy: false,
    // genReqId: genReqId()
  });

  const nodeStats = path.resolve('./dist/node/loadable-stats.json');
  const webStats = path.resolve('./dist/web/loadable-stats.json');

  server.register(fastifyCompress, {});

  server.register(fastifyEtag);

  server.register(fastifyStatic, {
    root: path.resolve('./dist/public'),
    prefix: '/',
    wildcard: false,
    decorateReply: true
  });

  server.register(fastifyStatic, {
    root: path.resolve('./dist/web'),
    prefix: '/assets',
    decorateReply: false
  });

  server.get('/healthcheck', (req, reply) => {
    reply.send({});
  });

  server.get('*', async (req, reply) => {
    const url = req.raw.url;
    const currentRoute: IRoute = routes.find(route => matchPath(url, route)) || {};

    let data = currentRoute.fetchInitialData
        ? (await currentRoute.fetchInitialData())
        : null;

    const context: any = { data };

    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
    const { App } = nodeExtractor.requireEntrypoint();

    const webExtractor = new ChunkExtractor({ statsFile: webStats });
    const jsx = webExtractor.collectChunks(
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    );

    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();

    if (context.url) {
      reply
        .code(context.status || 302)
        .redirect(context.url);
    } else {
      reply
        .code(context.status || 200)
        .header('content-type', 'text/html; charset=utf-8')
        .send(`<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    <link rel="icon" href="/favicon.ico"/>
    ${webExtractor.getLinkTags()}
    ${webExtractor.getStyleTags()}
  </head>
  <body ${helmet.bodyAttributes.toString()}>
    <div id="root">${html}</div>
    ${webExtractor.getScriptTags()}
  </body>
</html>`);
    }
  });

  return Promise.resolve(server);
}
