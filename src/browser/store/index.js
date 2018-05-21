/* eslint-disable import/prefer-default-export */
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

let store;

export function configureStore() {
  if (store) {
    return store;
  }
  let enhancer;
  const middleware = [];
  if (__DEV__) {
    middleware.push(logger);
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }
  store = createStore(rootReducer, {}, enhancer);

  return store;
}
