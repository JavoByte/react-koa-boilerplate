import React from 'react';

/*
 * This component will be shown whenever a page component is required
 * and its chunk hasn't been loaded yet
 */
class PageLoader extends React.Component {
  render() {
    return (
      <div>
        Loading page...
      </div>
    );
  }
}

export default PageLoader;
