import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { App } from '../common/app';

loadableReady(() => {
  const root = document.getElementById('root');

  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root);
});
