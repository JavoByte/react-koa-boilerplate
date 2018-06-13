/* eslint-disable import/prefer-default-export */
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

let store;

export function configureStore(initialState) {
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
  store = createStore(
    rootReducer,
    // eslint-disable-next-line no-underscore-dangle
    initialState || (window ? window.__PRELOADED_STATE__ : {}),
    enhancer,
  );

  if (process.env.BROWSER) {
    // eslint-disable-next-line no-underscore-dangle
    delete window.__PRELOADED_STATE__;
  }

  return store;
}
