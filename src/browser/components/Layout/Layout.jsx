import React from 'react';
import withStyles from 'withStyles';
import s from './Layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <h1>
          Your application is up and running
        </h1>

        <p>
          This app only serves a simple HTML with a simple React bundle, rendering this.
          It does not have enhacements for browser like Hot Module Reload or code splitting
        </p>

        <p>
          In order to stop webpack for making browser bundle follow this steps:
        </p>
        <ul>
          <li>
            Delete <code>src/browser</code> folder
          </li>
          <li>
            Edit file <code>tools/webpack.config.js</code> to delete <code>clientConfig</code>
            configuration and export only <code>serverConfig</code>
          </li>
          <li>
            Delete file <code>tools/postcss.config.js</code>
          </li>
          <li>
            Edit <code>package.json</code> and delete dependencies:
            <ul>
              <li><code>isomorphic-style-loader</code></li>
              <li><code>postcss-loader</code></li>
              <li><code>postcss-nested</code></li>
              <li><code>postcss-nesting</code></li>
              <li><code>rucksack-css</code></li>
              <li><code>style-loader</code></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
