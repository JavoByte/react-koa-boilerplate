import React from 'react';
import { Switch, Route } from 'react-router';
import NotFound from '~pages/NotFound';
import generateLoadableComponent from './generateLoadableComponent';

const Home = generateLoadableComponent(() => import('~pages/Home'));
const About = generateLoadableComponent(() => import('~pages/About'));

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route component={NotFound} />
  </Switch>
);
