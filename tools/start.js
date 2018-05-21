import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import run from './run';
import clean from './clean';
import runDevServer from './runDevServer';

const isDebug = !process.argv.includes('--release');

const [clientConfig] = webpackConfig;

async function start({ logger }) {
  await run(clean);

  await new Promise((resolve) => {
    let devMiddleware;
    let hotMiddleware;

    if (isDebug) {
      clientConfig.entry.client = [
        ...clientConfig.entry.client,
        'webpack-hot-middleware/client',
      ];
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    const bundler = webpack(webpackConfig);

    let handleBundleComplete = async () => {
      handleBundleComplete = (stats) => {
        if (!stats.stats[0].compilation.errors.length) {
          runDevServer();
        }
      };
      const server = await run(runDevServer);
      const bs = browserSync.create();
      const middleware = [];
      if (devMiddleware) {
        middleware.push(devMiddleware);
      }
      if (devMiddleware && hotMiddleware) {
        middleware.push(hotMiddleware);
      }
      logger.info('starting BS server with', middleware.length, 'middleware');
      bs.init({
        ...isDebug ? {} : { notify: false, ui: false },
        proxy: {
          target: server.host,
          middleware,
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };


    const customReporter = (middlewareOptions, options) => {
      const { state, stats } = options;

      if (state) {
        const displayStats = (middlewareOptions.stats !== false);

        if (displayStats) {
          const displayer = logger.raw || logger.log;
          if (stats.hasErrors()) {
            displayer(stats.toString({ colors: true, ...middlewareOptions.stats }));
          } else if (stats.hasWarnings()) {
            displayer(stats.toString({ colors: true, ...middlewareOptions.stats }));
          } else {
            displayer(stats.toString({ colors: true, ...middlewareOptions.stats }));
          }
        }

        let message = 'Compiled successfully.';

        if (stats.hasErrors()) {
          message = 'Failed to compile.';
        } else if (stats.hasWarnings()) {
          message = 'Compiled with warnings.';
        } else {
          handleBundleComplete(stats);
        }
        logger.info(message);
      } else {
        logger.info('Compiling...');
      }
    };

    if (isDebug) {
      devMiddleware = webpackDevMiddleware(bundler, {
        // IMPORTANT: webpack middleware can't access config,
        // so we should provide publicPath by ourselves
        publicPath: clientConfig.output.publicPath,

        // Write files to disk
        writeToDisk: true,
        logLevel: 'warn',
        reporter: customReporter,
      });

      hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);
    }
  });
}

export default start;
