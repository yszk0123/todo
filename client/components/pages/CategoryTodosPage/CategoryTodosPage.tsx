import React from 'react';
import {
  useCategoryTodosPageQuery,
  useCreateOneTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodosByIdMutation,
} from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import {
  TodoCreateInput,
  UpdateTodoInput,
  TodoStatus,
  DeleteTodosByIdInput,
} from '../../../graphql/__generated__/baseTypes';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { TodoStatusBar } from './TodoStatusBar';
import { TodoList } from './TodoList';
import { TodoEditForm } from './TodoEditForm';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { ID } from '../../../viewModels/ID';
import Head from 'next/head';

function first<T>(values: T[]): T | undefined {
  return values[0];
}

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
  const [updateTodo] = useUpdateTodoMutation({ onCompleted: handleCompleted });
  const [deleteTodosById] = useDeleteTodosByIdMutation({
    onCompleted: handleCompleted,
  });
  const [text, setText] = React.useState('');
  const [selectedTodoIds, setSelectedTodoIds] = React.useState<ID[]>([]);
  const [tags, setTags] = React.useState<CategoryTagFragment[]>([]);
  const [status, setStatus] = React.useState(TodoStatus.Todo);

  const deselect = React.useCallback(() => {
    setSelectedTodoIds([]);
    setText('');
    setTags([]);
    setStatus(TodoStatus.Todo);
  }, []);

  const handleSelectOneTodo = React.useCallback(
    (todo: CategoryTodoFragment) => {
      if (selectedTodoIds.length === 1 && first(selectedTodoIds) === todo.id) {
        deselect();
        return;
      }

      setSelectedTodoIds([todo.id]);
      setText(todo.text);
      setTags(todo.tags);
      setStatus(todo.status);
    },
    [selectedTodoIds, deselect]
  );

  const handleSelectManyTodo = React.useCallback(
    (todo: CategoryTodoFragment) => {
      const isSelected = !!selectedTodoIds.includes(todo.id);
      const newSelectedTodoIds = isSelected
        ? selectedTodoIds.filter((id) => id !== todo.id)
        : [...selectedTodoIds, todo.id];
      setSelectedTodoIds(newSelectedTodoIds);
    },
    [selectedTodoIds]
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

  const handleDeleteTodosById = React.useCallback(() => {
    const count = selectedTodoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    const input: DeleteTodosByIdInput = { ids: selectedTodoIds };
    deselect();
    deleteTodosById({ variables: { input } });
  }, [data, text, deselect, deleteTodosById, selectedTodoIds]);

  const handleUpdateTodo = React.useCallback(() => {
    const currentTodoId = first(selectedTodoIds);
    if (!currentTodoId) return;
    const tagIds = tags?.map((tag) => tag.id);
    const input: UpdateTodoInput = {
      id: currentTodoId,
      text,
      tags: tagIds,
      status,
    };
    updateTodo({ variables: { input } });
  }, [data, text, status, updateTodo, selectedTodoIds, tags]);

  const handleArchiveTodo = React.useCallback(() => {
    const currentTodoId = first(selectedTodoIds);
    if (!currentTodoId) return;
    const input: UpdateTodoInput = {
      id: currentTodoId,
      archivedAt: new Date(),
    };
    updateTodo({ variables: { input } });
  }, [selectedTodoIds, updateTodo]);

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
  const isSelected = selectedTodoIds.length > 0;

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
      <TodoList
        todos={todos}
        selectedTodoIds={selectedTodoIds}
        onClick={handleSelectOneTodo}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        name={text}
        tags={tags}
        status={status}
        categoryTags={categoryTags}
        isSelected={isSelected}
        onChangeName={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onUpdateOneTodo={handleUpdateTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onArchiveTodo={handleArchiveTodo}
        onToggleTag={handleToggleTag}
        onSelectStatus={handleSelectStatus}
      />
    </ContentWrapper>
  );
};
