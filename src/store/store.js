import { compose, createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';


import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

import { loggerMiddleware } from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware].filter(
//   Boolean
// );

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);

//Dont work
const composeEnhancer = ( process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);

// CurryFunc
// const curryFunc = (a) => (b,c) => {
//   a + b - c
// }
// const withA = curryFunc(3);
// withA(2,4); // 3+2-4
