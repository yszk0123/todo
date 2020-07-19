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
import { TodoStatusBarStatusSelect } from '../TodoStatusBar/TodoStatusBarStatusSelect';
import { TodoListIcon } from './TodoListIcon';
import { TodoListTags } from './TodoListTags';
import { TodoListText } from './TodoListText';

export const TodoListItem: React.FunctionComponent<{
  isCategoryNameShown: boolean;
  onClick: (todo: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
  onClickExpand: (todo: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment, status: TodoStatus) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (todo: RootTodoFragment) => void;
  todo: RootTodoFragment;
  todoSelection: Selection;
}> = ({
  isCategoryNameShown,
  onClick,
  onClickCategory,
  onClickExpand,
  onClickStatus,
  onClickTag,
  onClickToggle,
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
        expanded ? (
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
        )
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
      onClick={onClick}
    />
  );
};
