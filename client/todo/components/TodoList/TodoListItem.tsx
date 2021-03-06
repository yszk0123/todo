import React from 'react';

import { ListItem } from '../../../shared/components/List';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import {
  isExpanded,
  isSelected,
  isSelectedSome,
  Selection,
} from '../../../view_models/Selection';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoTagFragment,
} from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoStatusBarStatusSelect } from '../TodoStatusBar/TodoStatusBarStatusSelect';
import { TodoListIcon } from './TodoListIcon';
import { TodoListLink } from './TodoListLink';
import { TodoListParentLink } from './TodoListParentLink';
import { TodoListTags } from './TodoListTags';
import { TodoListText } from './TodoListText';

type Props = {
  isCategoryNameShown: boolean;
  onClick: (todo: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
  onClickExpand: (todo: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment, status: TodoStatus) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (todo: RootTodoFragment) => void;
  query: TodoSearchQuery;
  todo: RootTodoFragment;
  todoSelection: Selection;
};

export const TodoListItem: React.FunctionComponent<Props> = ({
  isCategoryNameShown,
  onClick,
  onClickCategory,
  onClickExpand,
  onClickStatus,
  onClickTag,
  onClickToggle,
  query,
  todo,
  todoSelection,
}) => {
  const handleClickExpand = React.useCallback(() => {
    onClickExpand(todo);
  }, [onClickExpand, todo]);

  const handleClickToggle = React.useCallback(() => {
    onClickToggle(todo);
  }, [todo, onClickToggle]);

  const handleClickStatus = React.useCallback(
    (status: TodoStatus) => {
      onClickStatus(todo, status);
    },
    [todo, onClickStatus]
  );

  const isDone = todo.status === TodoStatus.Done;
  const selected = React.useMemo(() => isSelected(todoSelection, todo.id), [
    todoSelection,
    todo,
  ]);
  const expanded = React.useMemo(() => isExpanded(todoSelection, todo.id), [
    todoSelection,
    todo,
  ]);
  const isSelectMode = React.useMemo(() => isSelectedSome(todoSelection), [
    todoSelection,
  ]);

  return (
    <ListItem
      isActive={selected}
      item={todo}
      leftElement={
        <>
          <TodoListParentLink query={query} todo={todo} />
          {expanded ? (
            <TodoStatusBarStatusSelect
              status={null}
              onChange={handleClickStatus}
            />
          ) : (
            <TodoListIcon
              isSelected={selected}
              isSelectMode={isSelectMode}
              todo={todo}
              onClick={isSelectMode ? handleClickToggle : handleClickExpand}
            />
          )}
        </>
      }
      mainElement={
        <TodoListText
          isDone={isDone}
          subElement={
            <TodoListTags
              category={todo.category}
              isCategoryNameShown={isCategoryNameShown}
              tags={todo.tags}
              onClickCategory={onClickCategory}
              onClickTag={onClickTag}
            />
          }
          text={todo.text}
        />
      }
      rightElement={<TodoListLink query={query} todo={todo} />}
      onClick={onClick}
    />
  );
};
