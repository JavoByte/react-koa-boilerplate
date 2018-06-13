/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { configureStore } from './store';
import Setup from './Setup';

const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => { removeCss.forEach(f => f()); };
};

const store = configureStore();

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(<Setup insertCss={insertCss} store={store} />, document.getElementById('app'));
});
