import { selector } from 'recoil';
import { sdkDependency } from './sdkDependency';
import { Todo } from '../graphql/sdk';

export const todosQuery = selector<Pick<Todo, 'id' | 'text' | 'createdAt'>[]>({
  key: 'todosQuery',
  async get({ get }) {
    const sdk = get(sdkDependency);
    const data = await sdk.todos();
    return data.todos ?? [];
  },
});
