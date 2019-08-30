import * as React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/about">About</Link>
      </header>
    );
  }
}
