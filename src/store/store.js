import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
  if(!action.type) {
    return next(action);
  }

  console.log('type         : ', action.type);
  console.log('payload      : ', action.payload);
  console.log('currentState : ', store.getState());

  next(action);

  console.log('next state   : ', store.getState());

}
const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

// CurryFunc
// const curryFunc = (a) => (b,c) => {
//   a + b - c
// }
// const withA = curryFunc(3);
// withA(2,4); // 3+2-4
