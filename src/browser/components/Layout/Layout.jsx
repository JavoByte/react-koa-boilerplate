import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import s from './Layout.css';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div className={s.container}>
        <h1>
          Your application is up and running
        </h1>

        { this.props.children }
      </div>
    );
  }
}

export default withStyles(s)(Layout);
