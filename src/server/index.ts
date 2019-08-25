import 'tslib';
import 'isomorphic-unfetch';

import { createServer } from './server';

const startServer = async () => {
  const server = createServer();
  const PORT = parseInt(process.env.PORT) || 3000;
  try {
    const address = await server.listen(PORT);
    server.log.info('Server listening on ${address}');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

startServer();
