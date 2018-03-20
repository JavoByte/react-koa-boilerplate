import path from 'path';
import fs from 'fs';
import webpack from 'webpack';

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
        loader: 'babel-loader',
        include: [
          path.resolve('..', 'src'),
        ],
      },
    ],
  },

  bail: !isDebug,
  cache: isDebug,
  mode: isDebug ? 'development' : 'production',
};

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',
  entry: {
    server: ['@babel/polyfill', './src/server.js'],
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

  ],

  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};

export default [serverConfig];
