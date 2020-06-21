import React from 'react';
import Link from 'next/link';
import {
  useTodosPageQuery,
  useCreateOneTodoMutation,
} from '../lib/graphql/__generated__/TodosPage.graphql';

const TodosPage: React.FunctionComponent<{}> = () => {
  const { loading, data } = useTodosPageQuery();
  const [createOneTodo] = useCreateOneTodoMutation();
  const [text, setText] = React.useState('');

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      createOneTodo({
        variables: {
          input: {
            author: { connect: { id: data.me.id } },
            text,
          },
        },
        // update(cache, mutationResult) {
        // }
      });
    }
  }, [data, createOneTodo]);

  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const text = event.currentTarget.value;
      setText(text);
    },
    []
  );

  if (loading || !data) {
    return null;
  }
  const todos = data.todos ?? [];

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <p>{todos.length} todos</p>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>;
        })}
      </ul>
      <input value={text} onChange={handleChangeText} />
      <button onClick={handleCreateOneTodo}>Create</button>
    </div>
  );
};

export default TodosPage;
