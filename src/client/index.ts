import 'core-js/proposals/global-this';

if (!globalThis.Promise || !globalThis.fetch) {
  Promise.all([
      import('es6-promise'),
      import('isomorphic-unfetch')
    ])
    .then(([es6Promise]) => {
      es6Promise.polyfill();
      startApp();
    });
} else {
  startApp();
}

function startApp() {
  console.log('*** update client/index.ts to use your favorite js library/framework ***');
  console.log(`running in browser: ${process.env.BROWSER}`);

  import('./hello')
    .then(({ Hello }) => {
      const hello = new Hello('Hello world!');
      hello.greet();
    });
}
