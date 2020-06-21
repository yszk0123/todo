import React from 'react';
import Link from 'next/link';
import { useRecoilState, useResetRecoilState, useRecoilCallback } from 'recoil';
import { todosQuery } from '../lib/values/todosQuery';
import { todoInputState } from '../lib/values/todoInputState';
import { createOneTodoMutation } from '../lib/values/createOneTodoMutation';
import { useRecoilValueOrPrevious } from '../lib/hooks/useRecoilValueOrPrevious';

const TodosPage: React.FunctionComponent<{}> = () => {
  const todos = useRecoilValueOrPrevious(todosQuery, []);
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const reset = useResetRecoilState(todosQuery);

  const createOneTodo = useRecoilCallback(
    ({ reset }) => async () => {
      await reset(todosQuery);
    },
    []
  );

  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value;
      setTodoInput({ text });
    },
    []
  );

  const handleCreate = React.useCallback(() => {
    createOneTodo();
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
