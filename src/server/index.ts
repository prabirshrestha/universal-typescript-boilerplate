import 'tslib';

import { createServer } from './server';

const startServer = async () => {
  try {
    const server = await createServer();
    server.log.info('Server created');
    const PORT = parseInt(process.env.PORT) || 3000;
    try {
      const address = await server.listen(PORT);
      server.log.info('Server listening on ${address}');
    } catch (err) {
      server.log.error(err);
      throw err;
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();
