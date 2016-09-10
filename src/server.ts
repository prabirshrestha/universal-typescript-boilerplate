require('isomorphic-fetch');

import * as express from 'express';
import * as path from 'path';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));

app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: __dirname });
});

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
