import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Router from '>shared/Router';
import Routes from '>shared/Routes';
import Layout from '~components/Layout';
import { configureStore } from '~store';

const store = configureStore();

class Setup extends React.Component {
  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  static propTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      insertCss: this.props.insertCss,
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Setup);
