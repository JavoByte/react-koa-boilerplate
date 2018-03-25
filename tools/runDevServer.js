import path from 'path';
import cp from 'child_process';
import webpackConfig from './webpack.config';

let server = null;
let pending = true;

const [, serverConfig] = webpackConfig;
const serverSrc = path.join(serverConfig.output.path, serverConfig.output.filename);

const runDevServer = () => new Promise((resolve) => {
  const onStdErr = (data) => {
    const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;
    const match = data.toString('utf8').match(RUNNING_REGEXP);
    if (match) {
      [, server.host] = match;
      process.stderr.removeListener('data', onStdErr);
      server.stderr.on('data', x => process.stderr.write(x));
      pending = false;
      resolve(server);
      setTimeout(() => {
        process.stderr.write(data);
      }, 500);
    } else {
      process.stderr.write(data);
    }
  };

  if (server) {
    server.kill('SIGTERM');
  }

  server = cp.spawn('node', [serverSrc], {
    env: {
      NODE_ENV: 'development',
      DEBUG: '*',
      DEBUG_COLORS: true,
      ...process.env,
    },
    silent: false,
  });

  if (pending) {
    server.once('exit', (code, signal) => {
      if (pending) {
        throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
      }
    });
  }
  server.stderr.on('data', onStdErr);
});

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runDevServer;
