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
import { TodoListStatusSelect } from './TodoListStatusSelect';
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
  onUpdateText: (todo: RootTodoFragment, text: string) => void;
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
  onUpdateText,
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

  const handleUpdateText = React.useCallback(
    (text: string) => {
      onUpdateText(todo, text);
    },
    [todo, onUpdateText]
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
        <TodoListStatusSelect
          isOpen={expanded}
          isSelected={selected}
          isSelectMode={isSelectMode}
          todo={todo}
          onChange={handleClickStatus}
          onClick={isSelectMode ? handleClickToggle : handleClickExpand}
          onClosePopover={handleClickToggle}
        />
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
          onUpdate={handleUpdateText}
        />
      }
      onClick={onClick}
    />
  );
};
