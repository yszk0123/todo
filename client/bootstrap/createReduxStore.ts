import { createStore } from 'redux';

import { rootReducer } from '../models/RootDucks';

export function createReduxStore() {
  const store = createStore(rootReducer);
  return store;
}
