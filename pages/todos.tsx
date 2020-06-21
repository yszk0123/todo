import React from 'react';
import Link from 'next/link';
import {
  useTodosPageQuery,
  useCreateOneTodoMutation,
  TodosPageDocument,
  TodosPageQuery,
  useDeleteTodoMutation,
  CreateOneTodoMutationOptions,
  DeleteTodoMutationOptions,
} from '../lib/graphql/__generated__/TodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
} from '../lib/graphql/__generated__/baseTypes';

const createOneTodoMutationOptions: CreateOneTodoMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<TodosPageQuery>({ query: TodosPageDocument });

    const todo = result.data?.createOneTodo;
    if (!todo) return;
    const newData: TodosPageQuery = {
      ...data,
      todos: [...(data?.todos ?? []), todo],
    };

    cache.writeQuery<TodosPageQuery>({
      query: TodosPageDocument,
      data: newData,
    });
  },
};

const deleteTodoMutationOptions: DeleteTodoMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<TodosPageQuery>({ query: TodosPageDocument });

    const todoId = result.data?.deleteTodo?.id;
    if (!todoId) return;
    const newData: TodosPageQuery = {
      ...data,
      todos: (data?.todos ?? []).filter((todo) => todo.id !== todoId),
    };

    cache.writeQuery<TodosPageQuery>({
      query: TodosPageDocument,
      data: newData,
    });
  },
};

const TodosPage: React.FunctionComponent<{}> = () => {
  const { loading, data } = useTodosPageQuery();
  const [createOneTodo] = useCreateOneTodoMutation(
    createOneTodoMutationOptions
  );
  const [deleteTodo] = useDeleteTodoMutation(deleteTodoMutationOptions);
  const [text, setText] = React.useState('');

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      const input: TodoCreateInput = {
        author: { connect: { id: data.me.id } },
        text,
      };
      createOneTodo({ variables: { input } });
    }
  }, [data, text, createOneTodo]);

  const handleDeleteTodo = React.useCallback(
    (todoId: number) => {
      const input: DeleteTodoInput = { id: todoId };
      deleteTodo({ variables: { input } });
    },
    [data, text, createOneTodo]
  );

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
          return (
            <li key={todo.id}>
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>[x]</button>
            </li>
          );
        })}
      </ul>
      <input value={text} onChange={handleChangeText} />
      <button onClick={handleCreateOneTodo}>Create</button>
    </div>
  );
};

export default TodosPage;
