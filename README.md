# Universal TypeScript boilerplate

## Installation

* `npm install`

## Development

```sh
npm start
```

Automatically watch and build client and server. Also auto restarts server when the server build is complete.

## Production Builds

```sh
npm run build:prod
```

Creates the production build under `build` folder. To start server run `npm run server`.

## Debug Build
```sh
npm run build:dev
```

Creates the development build under `build` folder. To start server run `npm run server`.

## React
React is not installed by default. If you would like to use react, react-dom, react-router v4 and mobx use run the following command.

```sh
npm run install:react
```

NOTE: TSX and decorators are already enabled by default even without running `npm run install:react`.