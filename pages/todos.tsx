import React from 'react';
import produce from 'immer';
import Link from 'next/link';
import {
  useTodosPageQuery,
  useCreateOneTodoMutation,
  TodosPageDocument,
  TodosPageQuery,
  useDeleteTodoMutation,
  CreateOneTodoMutationOptions,
  DeleteTodoMutationOptions,
  useUpdateTodoMutation,
} from '../lib/graphql/__generated__/TodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from '../lib/graphql/__generated__/baseTypes';

const createOneTodoMutationOptions: CreateOneTodoMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<TodosPageQuery>({ query: TodosPageDocument });

    const todo = result.data?.createOneTodo;
    if (!data || !todo) return;
    const newData = produce(data, (d) => {
      d.todos = [...(d.todos ?? []), todo];
    });

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
    if (!data || !todoId) return;
    const newData = produce(data, (d) => {
      d.todos = (d.todos ?? []).filter((todo) => todo.id !== todoId);
    });

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
  const [updateTodo] = useUpdateTodoMutation();
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

  const handleUpdateTodo = React.useCallback(
    (todoId: number) => {
      const input: UpdateTodoInput = { id: todoId, text };
      updateTodo({ variables: { input } });
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
              <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
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
