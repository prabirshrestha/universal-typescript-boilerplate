import * as React from 'react';

export const NotFound = ({ staticContext }) => {
  if (staticContext) { // undefined in browser
    staticContext.status = 404
  }

  return (
    <div>
      <strong>Not Found</strong>
    </div>
  );
}
