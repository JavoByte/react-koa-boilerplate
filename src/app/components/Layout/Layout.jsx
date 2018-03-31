import React from 'react';
import withStyles from 'withStyles';
import s from './Layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <button className="button">Testing</button>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
