import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { App } from '../common/app';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

loadableReady(() => {
  const root = document.getElementById('root');

  hydrate(
    <Router>
      <App />
    </Router>,
    root);

  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
      onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
      onUpdated: () => window['swUpdateAvailable'] = true // TODO: on router change if set to true perform force refresh
    });
  }
});
