import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from './App';
import { About } from './About';

export default (
    <Route path="/">
        <IndexRoute component={App} />
        <Route path="about" component={About}/>
    </Route>
);
