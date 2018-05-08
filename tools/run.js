/* eslint-disable no-console */
import moment from 'moment-timezone';
import chalk from 'chalk';

const now = () => moment().format('HH:mm:ss');

const createLogger = () => {
  const methods = {
    info: 'blue',
    warn: 'yellow',
    error: 'red',
    log: 'white',
  };
  const logger = {
    raw: console.log,
  };
  Object.keys(methods).forEach((method) => {
    const oldFunction = console[method];
    const color = methods[method];
    const newFunction = (...params) => {
      const timestampColor = color === 'white' ? 'blue' : color;
      const newParams = [
        chalk[timestampColor].bold(`${now()}\t`),
        ...params.map(param => chalk[color](param)),
      ];
      return oldFunction(...newParams);
    };
    logger[method] = newFunction;
  });
  logger.trace = logger.error;
  logger.debug = logger.log;
  return logger;
};

const logger = createLogger();

function run(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  logger.log('Starting', chalk.bold(fn.name));
  const startTimestamp = +new Date();
  return task({ logger, ...options }).then((results) => {
    const endTimestamp = +new Date();
    const elapsed = endTimestamp - startTimestamp;
    logger.log('Finished', chalk.bold(fn.name), `in ${elapsed}ms`);
    return results;
  });
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
  const moduleName = process.argv[2];
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const module = require(`./${moduleName}.js`).default;
  run(module).catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  });
}

export default run;
