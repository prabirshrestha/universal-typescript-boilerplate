import * as React from 'react';
import { routes } from './routes';
import { Route, Switch } from 'react-router-dom';
import { AppShell } from './appShell/appShell';

export class App extends React.Component {
  render() {
    return (
      <AppShell>
        <Switch>
          {routes.map(route => (
            <Route key={route.key || route.path} {...route} />
          ))}
        </Switch>
      </AppShell>
    );
  }
}
