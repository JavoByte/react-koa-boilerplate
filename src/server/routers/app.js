import debug from 'debug';
import Router from 'koa-router';

const router = new Router({ prefix: '/' });

router.get('*', async (ctx) => {
  const logger = debug(`${ctx.name}:router:app`);
  logger('Processing request for', ctx.request.path);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Koa React Boilerplate</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      <script src="/assets/browser.js"></script>
    </html>
  `;
  ctx.response.body = html;
});

export default router;
