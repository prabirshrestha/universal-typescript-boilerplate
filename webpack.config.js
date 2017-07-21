var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackMerge = require('webpack-merge');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var path = require('path');

var commonConfig = {
  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ['awesome-typescript-loader'] },
      { test: /\.json$/, loader: 'raw-loader' }
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

var clientConfig = {
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
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { 
              loader: 'postcss-loader',
              options: {
                'plugins': () => [require('autoprefixer')]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new StyleLintPlugin({ files: './src/*.css' }),
    new ExtractTextPlugin('css/[name].css'),
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

var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    libraryTarget: 'commonjs2',
    filename: '../server.js',
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]'
        ]
      }
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

// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    modules: [ root('/src'), 'node_modules']
  }
}

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
