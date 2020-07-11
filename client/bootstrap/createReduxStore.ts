import { createStore } from 'redux';

import { rootReducer } from '../shared/ducks/RootDucks';

export function createReduxStore() {
  const store = createStore(rootReducer);
  return store;
}
