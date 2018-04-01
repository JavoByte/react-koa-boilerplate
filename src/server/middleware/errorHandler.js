import 'source-map-support/register';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import StackTrace from 'stack-trace';
import PrettyError from 'pretty-error';
import pug from 'pug';

const logger = debug(`${process.env.APP_NAME || 'my-app'}:error-handler`);
const prettyError = new PrettyError();

function sendJsonResponse(ctx, error) {
  const json = {
    message: error.message || 'Internal server error',
  };
  if (error.messages) {
    json.messages = {};
    const { messages } = error;
    Object.keys(messages).forEach((field) => {
      let arrayOfErrors = messages[field];
      if (!Array.isArray(arrayOfErrors)) {
        console.warn(`Errors for field ${field} is not an array. This behaviour is unexpected`);
        arrayOfErrors = [messages];
      }
      arrayOfErrors = arrayOfErrors.map((item, i) => {
        if (typeof item !== 'string') {
          console.warn(`Error description #${i + 1} for field ${field} is not an array`);
          return `${item}`;
        }
        return item;
      });
      json.messages[field] = arrayOfErrors;
    });
  }
  ctx.response.body = json;
}

function sendHtmlResponse(ctx, error) {
  const { status } = error;
  let errorFile = path.resolve(__dirname, 'resources', 'views', 'errors', 'error.pug');
  if (status) {
    const maybeFile = path.resolve(__dirname, 'resources', 'views', 'errors', `${status}.pug`);
    if (fs.existsSync(maybeFile)) {
      errorFile = maybeFile;
    }
  }
  const compiler = pug.compileFile(errorFile);
  const trace = StackTrace.parse(error);
  ctx.response.body = compiler({ title: ctx.response.message, error, trace });
}

function sendTextResponse(ctx, error) {
  ctx.response.body = error.message || 'Internal server error';
}

function unacceptableRequestType(ctx) {
  ctx.response.status = 406;
  ctx.response.body = 'Unsupported request Accept type';
}

async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (error) {
    logger(error.message);
    if (process.env.NODE_ENV === 'development'
    && (!error.status || (error.status >= 500))) {
      console.error(prettyError.render(error));
    }
    ctx.response.status = error.status || 500;
    switch (ctx.accepts(['json', 'html', 'text'])) {
      case 'json':
        sendJsonResponse(ctx, error);
        break;
      case 'html':
        sendHtmlResponse(ctx, error);
        break;
      case 'text':
        sendTextResponse(ctx, error);
        break;
      default:
        unacceptableRequestType(ctx);
        break;
    }
  }
}

export default errorHandler;
