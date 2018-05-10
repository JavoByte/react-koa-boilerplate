import debug from 'debug';
import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router = new Router({ prefix: '/' });

router.get('*', async (ctx) => {
  const logger = debug(`${ctx.name}:router:app`);
  logger('Processing request for', ctx.request.path);
  const data = fs.readFileSync(path.resolve(__dirname, 'public/assets/index.html'));
  ctx.response.type = 'text/html';
  ctx.response.body = data;
});

export default router;
