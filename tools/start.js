import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';
import run from './run';
import clean from './clean';
import runDevServer from './runDevServer';

process.argv.push('--watch');
const isDebug = !process.argv.includes('--release');

const [clientConfig] = webpackConfig;

async function start({ logger }) {
  await run(clean);

  await new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);

    /*
    const devMiddleware = webpackDevMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: clientConfig.output.publicPath,

      // Pretty colored output
      stats: clientConfig.stats,

      // Write files to disk
      writeToDisk: true,

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    });
    */

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[0].compilation.errors.length && runDevServer();
      const server = await run(runDevServer);
      // const bs = browserSync.create();
      // bs.init({
      //   ...isDebug ? {} : { notify: false, ui: false },
      //   proxy: {
      //     target: server.host,
      //     middleware: [devMiddleware],
      //     proxyOptions: {
      //       xfwd: true,
      //     },
      //   },
      // }, resolve);
      resolve('ok');
    };

    bundler.watch({}, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        logger.raw(stats.toString({
          colors: true,
          verbose: true,
        }));
        handleBundleComplete(stats);
      }
    });
  });
}

export default start;
