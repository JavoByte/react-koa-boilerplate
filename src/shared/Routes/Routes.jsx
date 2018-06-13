import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';
import NotFound from '~pages/NotFound';
import PageLoader from '~components/PageLoader';

const Home = Loadable({
  loader: () => import('~pages/Home'),
  loading: PageLoader,
});

const About = Loadable({
  loader: () => import('~pages/About'),
  loading: PageLoader,
});

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route component={NotFound} />
  </Switch>
);
