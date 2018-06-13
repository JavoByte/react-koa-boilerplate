/* eslint-disable react/jsx-filename-extension */
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Loadable from 'react-loadable';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { getBundles } from 'react-loadable/webpack';
import Setup from '~Setup';
import { configureStore } from '~store';

const logger = debug(`${process.env.APP_NAME}:utils:render-react`);

async function renderReact(url, initialState) {
  await Loadable.preloadAll();
  const store = configureStore(initialState);
  const css = new Set();
  const modules = new Set();
  const context = { url };
  const insertCss = (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    styles.forEach(style => css.add(style._getCss()));
  };
  const content = ReactDOM.renderToString((
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
      <Setup insertCss={insertCss} store={store} context={context} />
    </Loadable.Capture>
  ));
  return {
    css,
    modules,
    content,
  };
}

export default async (url, initialState = {}) => {
  const baseHTML = fs.readFileSync(path.resolve(__dirname, 'public/assets/index.html'));
  const { content, css, modules } = await renderReact(url, initialState);
  const $ = cheerio.load(baseHTML);

  const stats = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'react-loadable.json')));
  const bundles = getBundles(stats, Array.from(modules));
  logger('Modules to insert %o', Array.from(modules));

  css.forEach((style) => {
    $(`<style>${style}</style>`).appendTo('head');
  });

  $(content).appendTo('#app');
  const initialStateScript = `
  <script type="text/javascript">window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
  `.trim();
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js')).map(bundle => `<script src="${bundle.publicPath}"></script>`);
  const lastScript = $('script').last();
  $(lastScript).before(initialStateScript);
  $(lastScript).before(scripts);
  return $.html();
};
