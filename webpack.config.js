const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

let commonConfig = {
  context: __dirname,
  output: {
    path: path.resolve('./build/public/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader']
      },
      { test: /\.json$/, loader: 'raw-loader' },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  plugins: [
  ]
};

if (process.env.NODE_ENV !== 'production') {
  commonConfig = webpackMerge({}, commonConfig, {
    devtool: 'source-map'
  });
}

const clientConfig = {
  target: 'web',
  entry: {
    app: './src/client'
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new StyleLintPlugin({ files: './src/**/*.css' }),
    new ManifestPlugin({
      fileName: '../manifest.json'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([
      { from: root('src/index.html'), to: root('build/public/index.html') },
      // { from: root('src/index.html'), to: root('build/public/200.html') } // surge treats 200.html as special file
    ]),
  ]
};

const serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('./build/server'),
    libraryTarget: 'commonjs2',
    filename: 'index.js',
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: true
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(false),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

module.exports = [
  // Client
  webpackMerge({}, commonConfig, clientConfig),

  // Server
  webpackMerge({}, commonConfig, serverConfig)
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
