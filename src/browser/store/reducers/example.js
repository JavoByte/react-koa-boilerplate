import { ACTION_EXAMPLE } from '~store/constants';

function example(state = 0, action) {
  switch (action.type) {
    case ACTION_EXAMPLE:
      return state + 1;
    default:
      return state;
  }
}

export default example;
