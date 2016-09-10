require('isomorphic-fetch');

import * as express from 'express';
import * as path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'mobx-react';

import routes from './Routes';
import { Store } from './Store';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));

app.get('*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            // something went wrong
            res.status(500).send((err && err.message) || err);
        } else if (redirectLocation) {
            // we matched a ReactRouter redirect, so redirect from the server
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            // Retrieve the promises from React Router components that have a fetchData method.
            // We use this data to populate our store for server side rendering.
            const store = new Store();

            const fetchedData = renderProps.components
                .filter(component => component && (<any>component).fetchData)
                .map(component => (<any>component).fetchData(store, renderProps.params));

            Promise.all(fetchedData)
                .then(() => {
                    // if we got props, that means we found a valid component to render for the given route
                    // since html tags conflicts within will use manual React.createElement instead
                    const reactMarkup = renderToString(
                        React.createElement(Provider, { store: store },
                            React.createElement(RouterContext, renderProps as any)));
                    const html = `<!doctype html>
<html lang="en">
<head>
    <title>TypeScript Boilerplate</title>
    <meta charset="UTF-8">
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>
<body>
    <div id="app">${reactMarkup}</div>
    <script>window.__INITIAL_STATE__=${JSON.stringify(store.dehydrate())};</script>
    <script src="/index.js"></script>
</body>
</html>`;
                    res.send(html);
                })
                .catch(err => {
                    res.status(500).send((err && err.message) || err);
                });
        } else {
            // no route match, so 404.
            res.sendStatus(404);
        }
    });
});

app.listen(3000, () => {
    console.log('Listening on: http://localhost:3000');
});
