import { createStore } from 'redux';

import { rootReducer } from '../state/RootState';

export function createReduxStore() {
  const store = createStore(rootReducer);
  return store;
}
