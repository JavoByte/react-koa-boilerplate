import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exampleActions from '~store/actions/example';

class Example extends React.Component {
  static propTypes = {
    example: PropTypes.number.isRequired,
    incrementExample: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <p>
          Example action has been triggered { this.props.example } times
        </p>
        <button onClick={this.props.incrementExample}>
          Trigger example action
        </button>
      </div>
    );
  }
}

export default connect(
  state => ({ example: state.example }),
  dispatch => bindActionCreators(exampleActions, dispatch),
)(Example);
