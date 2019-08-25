import * as React from 'react';
import { routes } from './routes';
import { Route, Switch } from 'react-router-dom';

export class App extends React.Component {
  render() {
    return (
      <Switch>
        {routes.map(route => (
          <Route key={route.key || route.path} {...route} />
        ))}
      </Switch>
    );
  }
}
