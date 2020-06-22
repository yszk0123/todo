import React from 'react';
import produce from 'immer';
import { Button, Flex, Text, Box } from 'rebass';
import { Input, Checkbox } from '@rebass/forms';
import {
  useTodosPageQuery,
  useCreateOneTodoMutation,
  TodosPageDocument,
  TodosPageQuery,
  useDeleteTodoMutation,
  CreateOneTodoMutationOptions,
  DeleteTodoMutationOptions,
  useUpdateTodoMutation,
} from '../client/graphql/__generated__/TodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
  Todo,
} from '../client/graphql/__generated__/baseTypes';
import { ContentWrapper } from '../client/components/layout/ContentWrapper';

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
  const isSelected = !!currentTodoId;

  const deselect = React.useCallback(() => {
    setCurrentTodoId(null);
    setText('');
  }, []);

  const handleSelectTodo = React.useCallback(
    (todo: Pick<Todo, 'id' | 'text'>) => {
      if (todo.id !== currentTodoId) {
        setCurrentTodoId(todo.id);
        setText(todo.text);
      } else {
        deselect();
      }
    },
    [currentTodoId, deselect]
  );

  const handleDeselectTodo = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      const input: TodoCreateInput = {
        author: { connect: { id: data.me.id } },
        text,
      };
      createOneTodo({ variables: { input } });
      deselect();
    }
  }, [data, text, deselect, createOneTodo]);

  const handleDeleteTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    if (!confirm('Delete?')) return;
    const input: DeleteTodoInput = { id: currentTodoId };
    deleteTodo({ variables: { input } });
    deselect();
  }, [data, text, deselect, createOneTodo, currentTodoId]);

  const handleUpdateTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    const input: UpdateTodoInput = { id: currentTodoId, text };
    updateTodo({ variables: { input } });
  }, [data, text, createOneTodo, currentTodoId]);

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
      <Box>
        <Text textAlign="right" color="gray">
          {todos.length} todos
        </Text>
      </Box>
      <Box mt={1} onClick={stopPropagation}>
        {todos.map((todo) => {
          return (
            <Flex
              key={todo.id}
              alignItems="center"
              bg={todo.id === currentTodoId ? 'highlight' : undefined}
              p={2}
            >
              <Checkbox />
              <Box flex="1 1 auto" onClick={() => handleSelectTodo(todo)}>
                <Text>{todo.text}</Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
      <Box as="form" my={3} onSubmit={preventDefault} onClick={stopPropagation}>
        <Flex alignItems="center">
          <Input value={text} onChange={handleChangeText} />
        </Flex>
        <Flex mt={2} alignItems="center" justifyContent="space-between">
          <Button
            type="button"
            width={1}
            variant="outline"
            onClick={handleDeleteTodo}
          >
            Delete
          </Button>
          <Button
            type="button"
            width={1}
            variant="outline"
            ml={1}
            disabled={!isSelected}
            onClick={handleUpdateTodo}
          >
            Update
          </Button>
          <Button
            type="submit"
            width={1}
            ml={1}
            variant="primary"
            onClick={handleCreateOneTodo}
          >
            Create
          </Button>
        </Flex>
      </Box>
    </ContentWrapper>
  );
};

export default TodosPage;
