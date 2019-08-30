import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ContactRoute = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        (staticContext as any).status = 302;
      }
      return <Redirect from="/contact" to="/about" />;
    }} />
  )
};

export default ContactRoute;

