import React from 'react';
import { Link } from 'react-router-dom';
import Example from '~connectedComponents/Example';

class Home extends React.Component {
  render() {
    return (
      <div>
        This is the home page
        <br />
        <Example />
        <Link to="/about">Go to about page</Link>
      </div>
    );
  }
}

export default Home;
