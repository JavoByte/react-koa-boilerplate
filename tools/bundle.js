import webpack from 'webpack';
import webpackConfig from './webpack.config';

const bundle = ({ logger }) => new Promise((resolve, reject) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      logger.raw(stats.toString({
        colors: true,
        verbose: true,
      }));
      resolve(stats);
    }
  });
});

export default bundle;
