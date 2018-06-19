import { hot } from 'react-hot-loader';
import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  render() {
    return (
      <div>
        About page
        <br />
        <Link to="/">Go back home</Link>
      </div>
    );
  }
}

export default hot(module)(About);
