import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import Layout from '../Layout';

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
      <Layout />
    );
  }
}

export default ApplicationMainContainer;
