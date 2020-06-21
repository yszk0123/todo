import { User } from './userQuery';
import { TodoInput } from './todoInputState';
import { Sdk } from '../graphql/sdk';

type CreateOneTodoInput = { user: User; todoInput: TodoInput };

export class TodoUsecase {
  constructor(private sdk: Sdk) {}

  async createOneTodo({ user, todoInput }: CreateOneTodoInput) {
    await this.sdk.createOneTodo({
      input: {
        author: { connect: { id: user.id } },
        text: todoInput.text,
      },
    });
  }
}
