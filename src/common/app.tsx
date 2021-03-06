import './normalize.css';
import * as React from 'react';
import { routes } from './routes';
import { Route, Switch } from 'react-router-dom';
import { AppShell } from './appShell/appShell';
import { Helmet } from 'react-helmet';

export class App extends React.Component {
  render() {
    return (
        <AppShell>
          <Helmet>
            <title>Universal Typescript Boilerplate</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Helmet>
          <Switch>
            {routes.map(route => (
              <Route key={route.key || route.path} {...route} />
            ))}
          </Switch>
        </AppShell>
    );
  }
}
