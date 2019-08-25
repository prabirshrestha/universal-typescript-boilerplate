import * as path from 'path';
import * as fastify from 'fastify';
import * as fastifyStatic from 'fastify-static';
import * as hyperid from 'hyperid';

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

  server.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/'
  });

  server.get('/healthcheck', (req, reply) => {
    reply.send({});
  });

  return server;
}
