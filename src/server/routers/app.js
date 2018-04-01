import Router from 'koa-router';

const router = new Router({ prefix: '/' });

router.get('*', async (ctx) => {
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
