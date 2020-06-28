import React from 'react';
import produce from 'immer';
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
} from '../graphql/__generated__/TodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from '../graphql/__generated__/baseTypes';
import { ContentWrapper } from './layout/ContentWrapper';
import { TodoVM } from '../viewModels/TodoVM';
import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';
import { TodoListItem } from './TodoListItem';
import { TodoForm } from './TodoForm';

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

type Props = {
  categoryId: number;
};

export const TodosPage: React.FunctionComponent<Props> = ({ categoryId }) => {
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
