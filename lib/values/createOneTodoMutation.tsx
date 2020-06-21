import { selector, CallbackInterface } from 'recoil';
import { sdkDependency } from './sdkDependency';
import { userQuery } from './userQuery';
import { todosQuery } from './todosQuery';
import { todoInputState } from './todoInputState';

export async function createOneTodoMutation({
  snapshot,
  reset,
}: CallbackInterface) {
  return async () => {
    const [sdk, user, todoInput] = await Promise.all([
      snapshot.getPromise(sdkDependency),
      snapshot.getPromise(userQuery),
      snapshot.getPromise(todoInputState),
    ]);
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
  };
}
