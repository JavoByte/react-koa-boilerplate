import React from 'react';
import PropTypes from 'prop-types';
import App from './components/ApplicationMainContainer';

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
      <App />
    );
  }
}


export default Setup;
