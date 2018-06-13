import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Router from '>shared/Router';
import Routes from '>shared/Routes';
import Layout from '~components/Layout';

class Setup extends React.Component {
  static propTypes = {
    insertCss: PropTypes.func.isRequired,
    store: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    context: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  static defaultProps = {
    context: undefined,
  };

  getChildContext() {
    return {
      insertCss: this.props.insertCss,
    };
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router context={this.props.context}>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Setup);
