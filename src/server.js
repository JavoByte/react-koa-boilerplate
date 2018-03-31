import path from 'path';
import Koa from 'koa';
import serveStatic from 'koa-static';
import debug from 'debug';
import appRouter from './backend/routers/app';

(() => {
  const logger = debug('my-awesome-app:server');
  const app = new Koa();
  const port = process.env.PORT || 3000;

  app.use(serveStatic(path.resolve(__dirname, 'public')));

  app
    .use(appRouter.routes())
    .use(appRouter.allowedMethods());

  app.listen(port, () => {
    logger(`The server is running at http://localhost:${port}/`);
  });
})();
