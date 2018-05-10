import React from 'react';
import Loadable from 'react-loadable';
import { Route } from 'react-router';
import PageLoader from '~components/PageLoader';

function generateLoadableComponent(loader) {
  return Loadable({
    loader,
    loading: PageLoader,
  });
}

function Routes() {
  return (
    <React.Fragment>
      <Route path="/" exact component={generateLoadableComponent(() => import('~components/Home'))} />
      <Route path="/about" exact component={generateLoadableComponent(() => import('~components/About'))} />
    </React.Fragment>
  );
}

export default Routes;
