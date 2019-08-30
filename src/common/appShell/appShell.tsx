import * as React from 'react';
import { Link } from 'react-router-dom';

export class AppShell extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/about">About</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
