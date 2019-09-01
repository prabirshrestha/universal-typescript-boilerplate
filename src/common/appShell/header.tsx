import * as React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from 'office-ui-fabric-react';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/"><PrimaryButton>Home</PrimaryButton></Link>&nbsp;
        <Link to="/about"><PrimaryButton>About</PrimaryButton></Link>
      </header>
    );
  }
}
