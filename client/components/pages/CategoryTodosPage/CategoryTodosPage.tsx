import Head from 'next/head';
import React from 'react';

import {
  DeleteTodosByIdInput,
  TodoCreateInput,
  TodoStatus,
  UpdateTodosByIdInput,
} from '../../../graphql/__generated__/baseTypes';
import {
  useCategoryTodosPageQuery,
  useCreateOneTodoMutation,
  useDeleteTodosByIdMutation,
  useUpdateTodosByIdMutation,
} from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ID } from '../../../viewModels/ID';
import { SelectMode } from '../../../viewModels/SelectMode';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { TodoEditForm } from './TodoEditForm';
import { TodoList } from './TodoList';
import { TodoStatusBar } from './TodoStatusBar';

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
  const [updateTodosById] = useUpdateTodosByIdMutation({
    onCompleted: handleCompleted,
  });
  const [deleteTodosById] = useDeleteTodosByIdMutation({
    onCompleted: handleCompleted,
  });
  const [text, setText] = React.useState('');
  const [selectedTodoIds, setSelectedTodoIds] = React.useState<ID[]>([]);
  const [tags, setTags] = React.useState<CategoryTagFragment[] | null>(null);
  const [status, setStatus] = React.useState(TodoStatus.Todo);

  const deselect = React.useCallback(() => {
    setSelectedTodoIds([]);
    setText('');
    setTags(null);
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
      setTags(newSelectedTodoIds.length === 1 ? todo.tags : null);
    },
    [selectedTodoIds]
  );

  const handleDeselectTodo = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      const newTags = tags?.map((tag) => ({ id: tag.id }));
      const input: TodoCreateInput = {
        owner: { connect: { id: data.me.id } },
        category: { connect: { id: categoryId } },
        tags: newTags ? { connect: newTags } : undefined,
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
  }, [deselect, deleteTodosById, selectedTodoIds]);

  const handleUpdateTodosById = React.useCallback(() => {
    const count = selectedTodoIds.length;
    if (count === 0) return;
    const tagIds = tags?.map((tag) => tag.id);
    const input: UpdateTodosByIdInput = {
      ids: selectedTodoIds,
      text: count === 1 ? text : undefined,
      tags: tagIds,
      status,
    };
    updateTodosById({ variables: { input } });
  }, [text, status, updateTodosById, selectedTodoIds, tags]);

  const handleArchiveTodosById = React.useCallback(() => {
    if (selectedTodoIds.length === 0) return;
    const input: UpdateTodosByIdInput = {
      ids: selectedTodoIds,
      archivedAt: new Date(),
    };
    updateTodosById({ variables: { input } });
  }, [selectedTodoIds, updateTodosById]);

  const handleToggleTag = React.useCallback(
    (tag: CategoryTagFragment) => {
      const oldTags = tags ?? [];
      const has = oldTags.find((t) => t.id === tag.id);
      const newTags = has
        ? oldTags.filter((t) => t.id !== tag.id)
        : [...oldTags, tag];
      setTags(newTags);
    },
    [tags]
  );

  const handleChangeText = React.useCallback((text: string) => {
    setText(text);
  }, []);

  const handleSelectStatus = React.useCallback((status: TodoStatus) => {
    setStatus(status);
  }, []);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const categoryName = data.category?.name ?? null;
  const todos = data.category?.todos ?? [];
  const categoryTags = data.category?.tags ?? [];
  const count = selectedTodoIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

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
        selectedTodoIds={selectedTodoIds}
        todos={todos}
        onClick={handleSelectOneTodo}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categoryTags={categoryTags}
        isTagsChanged={tags !== null}
        selectMode={selectMode}
        status={status}
        tags={tags ?? []}
        text={text}
        onArchiveTodo={handleArchiveTodosById}
        onChangeText={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectStatus={handleSelectStatus}
        onToggleTag={handleToggleTag}
        onUpdateOneTodo={handleUpdateTodosById}
      />
    </ContentWrapper>
  );
};
