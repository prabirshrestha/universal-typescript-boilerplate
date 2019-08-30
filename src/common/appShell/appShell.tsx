import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header } from './header';

export class AppShell extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
