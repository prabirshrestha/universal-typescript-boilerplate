import 'tslib';

import * as es6Promise from 'es6-promise';
es6Promise.polyfill();
import 'isomorphic-fetch';

console.log('*** update client.ts to use your favorite js library/framework ***');
console.log(`running in browser: ${process.env.BROWSER}`);
