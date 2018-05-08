import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import Home from '~Home';
import About from '~About';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Router;
