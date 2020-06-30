import React from 'react';
import produce from 'immer';
import {
  useCategoryTodosPageQuery,
  CategoryTodosPageDocument,
  CategoryTodosPageQuery,
} from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import {
  useCreateOneTodoMutation,
  useDeleteTodoMutation,
  CreateOneTodoMutationOptions,
  DeleteTodoMutationOptions,
  useUpdateTodoMutation,
} from '../../../graphql/__generated__/TodoPage.graphql';
import {
  TodoCreateInput,
  DeleteTodoInput,
  UpdateTodoInput,
  TodoStatus,
} from '../../../graphql/__generated__/baseTypes';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { TodoCount } from './TodoCount';
import { TodoList } from './TodoList';
import { TodoListItem } from './TodoListItem';
import { TodoForm } from './TodoForm';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';

const createOneTodoMutationOptions: CreateOneTodoMutationOptions = {
  update(cache, result) {
    const categoryId = result.data?.createOneTodo.categoryId;
    if (categoryId == null) {
      return;
    }
    const data = cache.readQuery<CategoryTodosPageQuery>({
      query: CategoryTodosPageDocument,
      variables: { categoryId },
    });

    const todo = result.data?.createOneTodo;
    if (!data || !todo) return;
    const newData = produce(data, (d) => {
      if (d.category) {
        d.category.todos = [...(d.category.todos ?? []), todo];
      }
    });

    cache.writeQuery<CategoryTodosPageQuery>({
      query: CategoryTodosPageDocument,
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

    const data = cache.readQuery<CategoryTodosPageQuery>({
      query: CategoryTodosPageDocument,
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

    cache.writeQuery<CategoryTodosPageQuery>({
      query: CategoryTodosPageDocument,
      variables: { categoryId },
      data: newData,
    });
  },
};

type Props = {
  categoryId: number;
};

export const CategoryTodosPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { loading, data } = useCategoryTodosPageQuery({
    variables: { categoryId },
  });
  const [createOneTodo] = useCreateOneTodoMutation(
    createOneTodoMutationOptions
  );
  const [deleteTodo] = useDeleteTodoMutation(deleteTodoMutationOptions);
  const [updateTodo] = useUpdateTodoMutation();
  const [text, setText] = React.useState('');
  const [currentTodoId, setCurrentTodoId] = React.useState<number | null>(null);
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
        author: { connect: { id: data.me.id } },
        category: { connect: { id: categoryId } },
        tags: { connect: newTags },
        text,
        status,
      };
      createOneTodo({ variables: { input } });
      deselect();
    }
  }, [data, text, tags, status, deselect, createOneTodo, categoryId]);

  const handleDeleteTodo = React.useCallback(() => {
    if (!currentTodoId) return;
    if (!confirm('Delete?')) return;
    const input: DeleteTodoInput = { id: currentTodoId };
    deleteTodo({ variables: { input } });
    deselect();
  }, [data, text, deselect, createOneTodo, currentTodoId]);

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
  }, [currentTodoId]);

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

  if (loading || !data) {
    return null;
  }
  const todos = data.category?.todos ?? [];
  const categoryTags = data.category?.tags ?? [];

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
