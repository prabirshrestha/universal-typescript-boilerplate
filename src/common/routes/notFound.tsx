import * as React from 'react';

export const NotFound = (routeData: any) => {
  routeData.staticContext.status = 404;
  return (
    <h1>Not Found</h1>
  );
}
