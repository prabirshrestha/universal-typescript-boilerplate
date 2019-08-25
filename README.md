# Universal TypeScript boilerplate

## Installation

* `yarn install`

## Development

```sh
yarn start
```

Automatically watch and build client and server. Also auto restarts server when the server build is complete.

## Production Builds

```sh
yarn build:prod
```

Creates the production build under `build` folder. To start server run `yarn server`.

## Debug Build
```sh
yarn build:dev
```

Creates the development build under `build` folder. To start server run `yarn server`.

## CI buids

Travis is configured to run `npm run ci`.