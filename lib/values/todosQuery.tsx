import { atom, selector, DefaultValue } from 'recoil';
import { sdkDependency } from './sdkDependency';
import { Todo } from '../graphql/sdk';

const refetch = atom({
  key: 'todosQuery/refetch',
  default: 0,
});

export const todosQuery = selector<Pick<Todo, 'id' | 'text' | 'createdAt'>[]>({
  key: 'todosQuery',
  async get({ get }) {
    const r = get(refetch);
    const sdk = get(sdkDependency);
    const data = await sdk.todos();
    return data.todos ?? [];
  },
  set({ set }, newValue) {
    if (newValue instanceof DefaultValue) {
      set(refetch, (v) => v + 1);
    }
  },
});
