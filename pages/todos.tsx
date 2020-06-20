import React from 'react';
import Link from 'next/link';
import { useRecoilValueOr } from '../lib/hooks/useRecoilValueOr';
import { todosQuery } from '../lib/values/todosQuery';

const TodosPage: React.FunctionComponent<{}> = () => {
  const todos = useRecoilValueOr(todosQuery) ?? [];
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setValue(value);
    },
    []
  );

  const handleAdd = React.useCallback(() => {}, []);

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
      <input value={value} onChange={handleChange} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodosPage;
