import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class About extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>About</title>
        </Helmet>
        <div>About</div>
      </>
    );
  }
}
