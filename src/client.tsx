require('es6-promise').polyfill();
require('isomorphic-fetch');

import * as React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory /* , hashHistory */ } from 'react-router';
import { Provider } from 'mobx-react';

import Routes from './Routes';
import { Store } from './Store';

const store = Store.rehydrate((window as any).__INITIAL_STATE__);

function renderApp(appRoutes: typeof Routes) {
    match({ history: browserHistory, routes: appRoutes }, (error, redirectLocation, renderProps) => {
        render(
            React.createElement(Provider, { store: store },
                React.createElement(Router, renderProps as any)),
            document.getElementById('app'));
    });

    // render(<Router routes={appRoutes} history={hashHistory} />, document.getElementById('app'));
}

renderApp(Routes);
