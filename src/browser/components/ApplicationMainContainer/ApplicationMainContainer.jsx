import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ApplicationMainContainer.css';
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
      <div className={s.body}>
        <Layout />
      </div>
    );
  }
}

export default withStyles(s)(ApplicationMainContainer);
