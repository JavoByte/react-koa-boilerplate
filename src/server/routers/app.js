import debug from 'debug';
import Router from 'koa-router';
import renderReact from '>server/utils/renderReact';

const router = new Router({ prefix: '/' });

router.get('*', async (ctx) => {
  const logger = debug(`${ctx.name}:router:app`);
  logger('Processing request for', ctx.request.path);
  const html = await renderReact(ctx.request.url, { example: 1 });
  ctx.response.body = html;
});

export default router;
