import { selector } from 'recoil';
import { sdkDependency } from './sdkDependency';
import { userQuery } from './userQuery';
import { todosQuery } from './todosQuery';
import { todoInputState } from './todoInputState';

export const createOneTodoMutation = selector({
  key: 'createOneTodoMutation',
  get() {},
  async set({ get, reset }) {
    const sdk = get(sdkDependency);
    const user = get(userQuery);
    const todoInput = get(todoInputState);
    if (!user) {
      return;
    }

    await sdk.createOneTodo({
      input: {
        author: { connect: { id: user.id } },
        text: todoInput.text,
      },
    });

    reset(todosQuery);
  },
});
