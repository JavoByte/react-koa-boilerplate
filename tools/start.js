import webpack from 'webpack';
import webpackConfig from './webpack.config';
import run from './run';
import clean from './clean';
import runDevServer from './runDevServer';

process.argv.push('--watch');

async function start({ logger }) {
  await run(clean);

  await new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);
    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[0].compilation.errors.length && runDevServer();
      resolve('ok');
      await run(runDevServer);
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
