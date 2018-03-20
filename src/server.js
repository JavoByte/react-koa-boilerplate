import Koa from 'koa';
import debug from 'debug';

(() => {
  const logger = debug('my-awesome-app:server');
  const app = new Koa();
  const port = process.env.PORT || 3000;

  app.use(async (ctx, next) => {
    ctx.response.body = 'Hello world!';
    await next();
  });

  app.listen(port, () => {
    logger(`The server is running at http://localhost:${port}/`);
  });
})();
