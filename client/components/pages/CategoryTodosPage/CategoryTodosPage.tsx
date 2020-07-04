import React from 'react';
import {
  useCategoryTodosPageQuery,
  useCreateOneTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
  TodoStatus,
} from '../../../graphql/__generated__/baseTypes';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { TodoStatusBar } from './TodoStatusBar';
import { TodoList } from './TodoList';
import { TodoListItem } from './TodoListItem';
import { TodoForm } from './TodoForm';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { LoadingIndicator } from '../../atoms/LoadingIndicator';
import { ID } from '../../../viewModels/ID';
import Head from 'next/head';

type Props = {
  categoryId: ID;
};

export const CategoryTodosPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { loading, data, refetch } = useCategoryTodosPageQuery({
    variables: { categoryId },
    fetchPolicy: 'cache-and-network',
  });
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneTodo] = useCreateOneTodoMutation({
    onCompleted: handleCompleted,
  });
  const [deleteTodo] = useDeleteTodoMutation({ onCompleted: handleCompleted });
  const [updateTodo] = useUpdateTodoMutation({ onCompleted: handleCompleted });
  const [text, setText] = React.useState('');
  const [currentTodoId, setCurrentTodoId] = React.useState<ID | null>(null);
  const [tags, setTags] = React.useState<CategoryTagFragment[]>([]);
  const [status, setStatus] = React.useState(TodoStatus.Todo);
  const isSelected = !!currentTodoId;

  const deselect = React.useCallback(() => {
    setCurrentTodoId(null);
    setText('');
    setTags([]);
    setStatus(TodoStatus.Todo);
  }, []);

  const handleSelectTodo = React.useCallback(
    (todo: CategoryTodoFragment) => {
      if (todo.id !== currentTodoId) {
        setCurrentTodoId(todo.id);
        setText(todo.text);
        setTags(todo.tags);
        setStatus(todo.status);
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
      const newTags = tags.map((tag) => ({ id: tag.id }));
      const input: TodoCreateInput = {
        owner: { connect: { id: data.me.id } },
        category: { connect: { id: categoryId } },
        tags: { connect: newTags },
        text,
        status,
      };
      deselect();
      createOneTodo({ variables: { input } });
    }
  }, [data, text, tags, status, deselect, createOneTodo, categoryId]);

  const handleDeleteTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    if (!confirm('Delete?')) return;
    const input: DeleteTodoInput = { id: currentTodoId };
    deselect();
    deleteTodo({ variables: { input } });
  }, [data, text, deselect, deleteTodo, currentTodoId]);

  const handleUpdateTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    const tagIds = tags?.map((tag) => tag.id);
    const input: UpdateTodoInput = {
      id: currentTodoId,
      text,
      tags: tagIds,
      status,
    };
    updateTodo({ variables: { input } });
  }, [data, text, status, updateTodo, currentTodoId, tags]);

  const handleArchiveTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    const input: UpdateTodoInput = {
      id: currentTodoId,
      archivedAt: new Date(),
    };
    updateTodo({ variables: { input } });
  }, [currentTodoId, updateTodo]);

  const handleToggleTag = React.useCallback(
    (tag: CategoryTagFragment) => {
      const has = tags.find((t) => t.id === tag.id);
      const newTags = has
        ? tags.filter((t) => t.id !== tag.id)
        : [...tags, tag];
      setTags(newTags);
    },
    [tags]
  );

  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = event.currentTarget.value;
      setText(text);
    },
    []
  );

  const handleSelectStatus = React.useCallback((status: TodoStatus) => {
    setStatus(status);
  }, []);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const categoryName = data.category?.name ?? null;
  const todos = data.category?.todos ?? [];
  const categoryTags = data.category?.tags ?? [];

  return (
    <ContentWrapper onClick={handleDeselectTodo}>
      {categoryName && (
        <Head>
          <title>{categoryName}</title>
        </Head>
      )}
      <TodoStatusBar
        categoryId={categoryId}
        categoryName={categoryName}
        count={todos.length}
      />
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
        name={text}
        tags={tags}
        status={status}
        categoryTags={categoryTags}
        isSelected={isSelected}
        onChangeName={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onUpdateOneTodo={handleUpdateTodo}
        onDeleteOneTodo={handleDeleteTodo}
        onArchiveTodo={handleArchiveTodo}
        onToggleTag={handleToggleTag}
        onSelectStatus={handleSelectStatus}
      />
    </ContentWrapper>
  );
};
