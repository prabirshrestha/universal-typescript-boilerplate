require('es6-promise').polyfill();
require('isomorphic-fetch');

import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

function renderApp(AppComponent: typeof App) {
    render(<App/>, document.getElementById('app'));
}

renderApp(App);
