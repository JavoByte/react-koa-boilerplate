import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import Layout from '~Layout';
import Router from './Router';

const logger = debug('ApplicationMainContainer');

class ApplicationMainContainer extends React.Component {
  static contextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  componentWillMount() {
    logger('Mounting ApplicationMainContainer');
  }

  render() {
    return (
      <Layout>
        <Router />
      </Layout>
    );
  }
}

export default ApplicationMainContainer;
