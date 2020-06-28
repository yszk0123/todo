import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import produce from 'immer';
import { Button, Flex, Text, Box } from 'rebass';
import { Input, Checkbox } from '@rebass/forms';
import { useRouter } from 'next/router';
import {
  useTodosPageQuery,
  useCreateOneTodoMutation,
  TodosPageDocument,
  TodosPageQuery,
  useDeleteTodoMutation,
  CreateOneTodoMutationOptions,
  DeleteTodoMutationOptions,
  useUpdateTodoMutation,
} from '../../../client/graphql/__generated__/TodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from '../../../client/graphql/__generated__/baseTypes';
import { ContentWrapper } from '../../../client/components/layout/ContentWrapper';
import { preventDefault } from '../../../client/handlers/preventDefault';
import { stopPropagation } from '../../../client/handlers/stopPropagation';
import { TodoVM } from '../../../client/viewModels/TodoVM';

function linkifyComponentDecorator(
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode {
  return (
    <a href={decoratedHref} rel="noopener" target="_blank" key={key}>
      {decoratedText}
    </a>
  );
}

const createOneTodoMutationOptions: CreateOneTodoMutationOptions = {
  update(cache, result) {
    const categoryId = result.data?.createOneTodo.categoryId;
    if (categoryId == null) {
      return;
    }
    const data = cache.readQuery<TodosPageQuery>({
      query: TodosPageDocument,
      variables: { categoryId },
    });

    const todo = result.data?.createOneTodo;
    if (!data || !todo) return;
    const newData = produce(data, (d) => {
      if (d.category) {
        d.category.todos = [...(d.category.todos ?? []), todo];
      }
    });

    cache.writeQuery<TodosPageQuery>({
      query: TodosPageDocument,
      variables: { categoryId },
      data: newData,
    });
  },
};

const deleteTodoMutationOptions: DeleteTodoMutationOptions = {
  update(cache, result) {
    const categoryId = result.data?.deleteTodo?.categoryId;
    if (categoryId == null) {
      return;
    }

    const data = cache.readQuery<TodosPageQuery>({
      query: TodosPageDocument,
      variables: { categoryId },
    });

    const todoId = result.data?.deleteTodo?.id;
    if (!data || !todoId) return;
    const newData = produce(data, (d) => {
      if (d.category) {
        d.category.todos = (d.category.todos ?? []).filter(
          (todo) => todo.id !== todoId
        );
      }
    });

    cache.writeQuery<TodosPageQuery>({
      query: TodosPageDocument,
      variables: { categoryId },
      data: newData,
    });
  },
};

const TodoCount: React.FunctionComponent<{ count: number }> = ({ count }) => {
  return (
    <Box>
      <Text textAlign="right" fontSize={2} color="gray">
        {count} todos
      </Text>
    </Box>
  );
};

const TodoList: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Box mt={1} onClick={stopPropagation}>
      {children}
    </Box>
  );
};

const TodoListItem: React.FunctionComponent<{
  isActive: boolean;
  todo: TodoVM;
  onClick: (todo: TodoVM) => void;
}> = ({ isActive, todo, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(todo);
  }, [todo]);

  return (
    <Flex alignItems="center" p={2}>
      <Checkbox />
      <Box
        flex="1 1 auto"
        bg={isActive ? 'highlight' : undefined}
        onClick={handleClick}
      >
        <Text>
          <Linkify componentDecorator={linkifyComponentDecorator}>
            {todo.text}
          </Linkify>
        </Text>
      </Box>
    </Flex>
  );
};

const TodoForm: React.FunctionComponent<{
  name: string;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
}) => {
  return (
    <Box as="form" my={2} onSubmit={preventDefault} onClick={stopPropagation}>
      <Flex alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        <Button
          type="button"
          width={1}
          variant="outline"
          onClick={onDeleteOneTodo}
        >
          Delete
        </Button>
        <Button
          type="button"
          width={1}
          variant="outline"
          ml={2}
          disabled={!isSelected}
          onClick={onUpdateOneTodo}
        >
          Update
        </Button>
        <Button
          type="submit"
          width={1}
          ml={2}
          variant="primary"
          onClick={onCreateOneTodo}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
};

type Props = {
  categoryId: number;
};

const TodosPage: React.FunctionComponent<Props> = ({ categoryId }) => {
  const { loading, data } = useTodosPageQuery({ variables: { categoryId } });
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
    (todo: TodoVM) => {
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
        category: { connect: { id: categoryId } },
        text,
      };
      createOneTodo({ variables: { input } });
      deselect();
    }
  }, [data, text, deselect, createOneTodo, categoryId]);

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
  const todos = data.category?.todos ?? [];

  return (
    <ContentWrapper onClick={handleDeselectTodo}>
      <TodoCount count={todos.length} />
      <TodoList>
        {todos.map((todo) => {
          return (
            <TodoListItem
              key={todo.id}
              todo={todo}
              isActive={todo.id === currentTodoId}
              onClick={handleSelectTodo}
            />
          );
        })}
      </TodoList>
      <TodoForm
        name={name}
        isSelected={isSelected}
        onChangeName={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onUpdateOneTodo={handleUpdateTodo}
        onDeleteOneTodo={handleDeleteTodo}
      />
    </ContentWrapper>
  );
};

export default () => {
  const router = useRouter();
  const categoryId = Number(router.query.categoryId);

  return <TodosPage categoryId={categoryId} />;
};
