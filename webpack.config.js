var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    preLoaders: [
      { test: /\.tsx?$/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.tsx?$/, loaders: ['ts-loader'] },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'raw-loader' }
    ]
  },
  plugins: [
  ]
};

var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: root('src/index.html'), to: root('dist/client/index.html') },
      // { from: root('src/index.html'), to: root('dist/client/200.html') } // surge treats 200.html as special file
    ])
  ]
};

var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    root: root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
}

var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
