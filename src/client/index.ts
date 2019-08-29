startApp();

function startApp() {
  console.log(`running in browser: ${process.env.BROWSER}`);

  Promise.all([
    import('react'),
    import('react-dom'),
    import('react-router-dom'),
    import('../common/app')
  ]).then(([ React, ReactDOM, { BrowserRouter }, { App } ]) => {
    ReactDOM.hydrate(
      React.createElement(BrowserRouter, {},
        React.createElement(App)),
      document.getElementById('root'));
  });
}
