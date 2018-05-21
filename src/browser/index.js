/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import Setup from './Setup';

const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => { removeCss.forEach(f => f()); };
};

ReactDOM.render(<Setup insertCss={insertCss} />, document.getElementById('app'));
