import React, { useState } from 'react';
import Link from 'next/link';
import { useRecoilState, useResetRecoilState, useRecoilCallback } from 'recoil';
import { todosQuery } from '../lib/values/todosQuery';
import { todoInputState } from '../lib/values/todoInputState';
import { TodoUsecase } from '../lib/values/createOneTodoMutation';
import { useRecoilValueOrPrevious } from '../lib/hooks/useRecoilValueOrPrevious';
import { createSDK } from '../lib/values/SDK';
import { useRecoilValueOr } from '../lib/hooks/useRecoilValueOr';
import { userQuery } from '../lib/values/userQuery';
import { useUsecase } from '../lib/hooks/useUsecase';

function createUsecase() {
  const sdk = createSDK();
  const todoUsecase = new TodoUsecase(sdk);
  return { todoUsecase };
}

const TodosPage: React.FunctionComponent<{}> = () => {
  const { todoUsecase } = useUsecase(createUsecase);
  const user = useRecoilValueOr(userQuery);
  const todos = useRecoilValueOrPrevious(todosQuery, []);
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const reset = useResetRecoilState(todosQuery);

  const handleCreateOneTodo = useRecoilCallback(
    ({ reset }) => async () => {
      if (!user) return;
      await todoUsecase.createOneTodo({ user, todoInput });
      reset(todosQuery);
    },
    [user, todosQuery]
  );

  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value;
      setTodoInput({ text });
    },
    []
  );

  const handleCreate = React.useCallback(() => {
    handleCreateOneTodo();
  }, []);

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>{todos.length} todos</p>
      <ul>
        {(todos || []).map((todo) => {
          return <li key={todo.id}>{todo.text}</li>;
        })}
      </ul>
      <input value={todoInput.text} onChange={handleChangeText} />
      <button onClick={handleCreate}>Create</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default TodosPage;
