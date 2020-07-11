import { createStore } from 'redux';

import { rootReducer } from '../models/RootState';

export function createReduxStore() {
  const store = createStore(rootReducer);
  return store;
}
