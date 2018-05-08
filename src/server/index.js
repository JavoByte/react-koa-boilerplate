import path from 'path';
import Koa from 'koa';
import serveStatic from 'koa-static';
import debug from 'debug';
import pkg from '../../package.json';
import errorHandler from './middleware/errorHandler';
import appRouter from './routers/app';

(() => {
  const appName = process.env.APP_NAME || pkg.name || 'my-awesome-app';
  const logger = debug(`${appName}:server`);
  const app = new Koa();
  app.context.name = appName;
  const port = process.env.PORT || 3000;


  app.use(serveStatic(path.resolve(__dirname, 'public')));
  app.use(errorHandler);

  app
    .use(appRouter.routes())
    .use(appRouter.allowedMethods());

  app.listen(port, () => {
    logger(`The server is running at http://localhost:${port}/`);
  });
})();
