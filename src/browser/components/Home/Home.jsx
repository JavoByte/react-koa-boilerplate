import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        This is the home page
        <br />
        <Link to="/about">Go to about page</Link>
      </div>
    );
  }
}

export default Home;
