import Router from 'koa-router';

const router = new Router({ prefix: '/' });

router.get('*', async (ctx) => {
  const error = new Error('Invalid input');
  error.status = 422;
  const errors = {
    name: [
      'This field is required',
    ],
  };
  error.messages = errors;
  throw error;
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
