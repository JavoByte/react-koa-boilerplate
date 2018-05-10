import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    new webpack.DefinePlugin({
      DEBUG: process.env.DEBUG || (isDebug ? '*' : null),
    }),
    new HtmlWebpackPlugin({
      template: 'src/server/index.html',
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
    new CopyWebpackPlugin([
      {
        from: 'resources/**',
        to: '../..',
      },
    ]),
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
