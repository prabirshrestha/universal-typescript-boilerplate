function startApp() {
  console.log(`running in browser: ${process.env.BROWSER}`);

  Promise.all([
    import('react'),
    import('react-dom'),
    import('react-router-dom'),
    import('../common/app')
  ]).then(([ React, ReactDOM, { BrowserRouter }, { App } ]) => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root'));
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}

startApp();
