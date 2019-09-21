const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist');
const production = process.env.NODE_ENV === 'production';
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const analyzeBundle = 0;

const getConfig = target => {
    return {
      name: target,
      mode: development ? 'development' : 'production',
      target: target === 'server' ? 'node' : target,
      entry: target === 'server' ? './src/server/index' : `./src/client/main-${target}`,
      devtool: development ? 'eval-cheap-module-source-map' : 'source-map',
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
          },
          {
            test: /\.jsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  caller: { target }
                }
              }
            ]
          },
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  caller: { target }
                }
              },
              'ts-loader'
            ]
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: development
                },
              },
              'css-loader'
            ],
          },
        ]
      },
      optimization: {
        splitChunks: target === 'web' ? {
          cacheGroups: {
            vendors: {
              chunks: 'all',
              name: 'vendors',
              test: /node_modules/
            }
          }
        } : undefined
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
      },
      externals: target === 'web' ? undefined : ['@loadable/component', nodeExternals()],
      output: {
        path: path.join(DIST_PATH, target),
        filename: production && target !== 'server' ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
        publicPath: `/assets/`,
        libraryTarget: target === 'web' ? undefined : 'commonjs2'
      },
      plugins: [
        new LoadablePlugin(),
        new MiniCssExtractPlugin(),
        ...(target === 'server'
          ? [new CopyWebpackPlugin([
                { from: './src/public', to: '../public' }
            ])]
          : []
        ),
        ...(target === 'web' && production
          ? [
            new OfflinePlugin({
              excludes: [
                '**/*.map',
                'loadable-stats.json'
              ],
              externals: [
                '/favicon.ico'
              ],
              autoUpdate: 1000 * 60 * 2,
              ServiceWorker: {
                output: '../public/sw.js',
                publicPath: '/sw.js',
                events: true,
                minify: true
              }
            })
          ]
          : []),
        ...(analyzeBundle && target === 'web' ? [ new BundleAnalyzerPlugin() ] : [])
      ],
    };
};

module.exports = [
  getConfig('web'),
  getConfig('node'),
  getConfig('server')
];
