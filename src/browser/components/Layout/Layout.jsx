import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'withStyles';
import s from '~styles/global.css';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <React.Fragment>
        { this.props.children }
      </React.Fragment>
    );
  }
}

export default withStyles(s)(Layout);
