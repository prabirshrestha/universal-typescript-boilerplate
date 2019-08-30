import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div>Home</div>
      </>
    );
  }
}
