import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ReactLoadablePlugin } from 'react-loadable/webpack';
import pkg from '../package.json';

const appName = pkg.name;

require.extensions['.scss'] = () => undefined;
require.extensions['.css'] = () => undefined;

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

/*
 * Server and client shared configuration
*/
const config = {
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
              camelCase: 'dashes',
              discardComments: { removeAll: !isDebug },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './tools/postcss.config.js',
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG': process.env.DEBUG || (isDebug ? `"${appName}:*"` : null),
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': 'typeof window !== "undefined"',
      'process.env.APP_NAME': `"${appName}"`,
      __APP_NAME__: `"${appName}"`,
      __DEV__: isDebug,
    }),
  ],

  bail: !isDebug,
  cache: isDebug,
  mode: isDebug ? 'development' : 'production',
};

const clientConfig = {
  ...config,
  name: 'client',
  target: 'web',

  entry: {
    client: ['@babel/polyfill', './src/browser/index.js'],
  },

  output: {
    ...config.output,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },

  devtool: isDebug ? 'cheap-module-source-map' : false,

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  plugins: [
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: 'src/server/index.html',
    }),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',
  entry: {
    server: ['@babel/polyfill', './src/server/index.js'],
  },
  externals: (() => {
    const nodeModules = {};
    fs.readdirSync('./node_modules')
      .filter(x => ['.bin'].indexOf(x) === -1)
      .forEach((mod) => {
        nodeModules[mod] = `commonjs ${mod}`;
      });
    return nodeModules;
  })(),
  output: {
    ...config.output,
    filename: '../../server.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    ...config.plugins,
    new CopyWebpackPlugin([
      {
        from: 'resources/**',
        to: '../..',
      },
    ]),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};

export default [clientConfig, serverConfig];
