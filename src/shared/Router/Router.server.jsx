import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';

const Router = ({ context, children }) => (
  <StaticRouter location={context.url} context={context}>
    { children }
  </StaticRouter>
);

Router.propTypes = {
  context: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default Router;
