import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '>shared/Routes';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default Router;
