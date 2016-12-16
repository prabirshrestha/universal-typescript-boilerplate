import 'tslib';

import * as es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-fetch';

import * as express from 'express';
import * as path from 'path';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const PORT = process.env.PORT || 3000;

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));

app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
});

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const pojo = { status: 404, message: 'No Content' };
  const json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
