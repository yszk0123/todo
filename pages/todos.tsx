import React from 'react';
import Link from 'next/link';
import { useRecoilValueOr } from '../lib/hooks/useRecoilValueOr';
import { todosQuery } from '../lib/values/todosQuery';
import { useRecoilState } from 'recoil';
import { todoInputState } from '../lib/values/todoInputState';
import { useSetRecoilState } from 'recoil';
import { createOneTodoMutation } from '../lib/values/createOneTodoMutation';
import { useResetRecoilState } from 'recoil';

const TodosPage: React.FunctionComponent<{}> = () => {
  const todos = useRecoilValueOr(todosQuery) ?? [];
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const createOneTodo = useSetRecoilState(createOneTodoMutation);
  const reset = useResetRecoilState(todosQuery);

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
