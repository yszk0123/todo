import React from 'react';
import produce from 'immer';
import { Button, Flex, Text, Box } from 'rebass';
import { Input } from '@rebass/forms';
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
  Todo,
} from '../lib/graphql/__generated__/baseTypes';
import { ContentWrapper } from '../lib/components/layout/ContentWrapper';

function preventDefault(event: React.SyntheticEvent) {
  event.preventDefault();
}

function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

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
  const [currentTodoId, setCurrentTodoId] = React.useState<number | null>(null);

  const handleSelectTodo = React.useCallback(
    (todo: Pick<Todo, 'id' | 'text'>) => {
      setCurrentTodoId(todo.id);
      setText(todo.text);
    },
    []
  );

  const handleDeselectTodo = React.useCallback(() => {
    setCurrentTodoId(null);
    setText('');
  }, []);

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      const input: TodoCreateInput = {
        author: { connect: { id: data.me.id } },
        text,
      };
      createOneTodo({ variables: { input } });
      setText('');
    }
  }, [data, text, createOneTodo]);

  const handleDeleteTodo = React.useCallback(
    (todoId: number) => {
      if (!confirm('Delete?')) return;
      const input: DeleteTodoInput = { id: todoId };
      deleteTodo({ variables: { input } });
    },
    [data, text, createOneTodo]
  );

  const handleUpdateTodo = React.useCallback(
    (todoId: number) => {
      const input: UpdateTodoInput = { id: todoId, text };
      updateTodo({ variables: { input } });
      setText('');
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
    <ContentWrapper onClick={handleDeselectTodo}>
      <p>{todos.length} todos</p>
      <Box onClick={stopPropagation}>
        {todos.map((todo) => {
          return (
            <Flex
              key={todo.id}
              alignItems="center"
              bg={todo.id === currentTodoId ? 'muted' : undefined}
            >
              <Box flex="1 1 auto" onClick={() => handleSelectTodo(todo)}>
                <Text>{todo.text}</Text>
              </Box>
              <Box py={1}>
                <Button
                  variant="secondary"
                  mx={1}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  X
                </Button>
                <Button
                  variant="secondary"
                  mx={1}
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  Update
                </Button>
              </Box>
            </Flex>
          );
        })}
      </Box>
      <Box as="form" onSubmit={preventDefault}>
        <Flex alignItems="center" my={3}>
          <Input value={text} onChange={handleChangeText} />
          <Button variant="primary" mx={1} onClick={handleCreateOneTodo}>
            Create
          </Button>
        </Flex>
      </Box>
    </ContentWrapper>
  );
};

export default TodosPage;
