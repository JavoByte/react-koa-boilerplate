import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import webpackConfig from './webpack.config';

const analyze = process.argv.includes('--analyze');

const bundle = ({ logger }) => new Promise((resolve, reject) => {
  const [clientConfig] = webpackConfig;
  if (analyze) {
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
  }
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
