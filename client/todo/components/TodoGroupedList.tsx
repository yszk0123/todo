import React from 'react';

import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { groupTodoByCheckpoint } from '../../view_models/Todo';
import { TodoSelection } from '../../view_models/TodoSelection';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoCheckpointFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoList } from './TodoList';

export const TodoGroupedList: React.FunctionComponent<{
  isCategoryNameShown: boolean;
  now: number;
  onClick: (item: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
  onClickCheckpoint: (checkpoint: TodoCheckpointFragment) => void;
  onClickExpand: (item: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment, status: TodoStatus) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (item: RootTodoFragment) => void;
  todoSelection: TodoSelection;
  todos: RootTodoFragment[];
}> = ({
  isCategoryNameShown,
  now,
  onClick,
  onClickCategory,
  onClickCheckpoint,
  onClickExpand,
  onClickStatus,
  onClickTag,
  onClickToggle,
  todoSelection,
  todos,
}) => {
  const groups = React.useMemo(() => groupTodoByCheckpoint(todos), [todos]);

  return (
    <>
      {groups.map((group, i) => {
        return (
          <TodoList
            group={group}
            isCategoryNameShown={isCategoryNameShown}
            key={`${group.header.name}-${i}`}
            now={now}
            todoSelection={todoSelection}
            onClick={onClick}
            onClickCategory={onClickCategory}
            onClickCheckpoint={onClickCheckpoint}
            onClickExpand={onClickExpand}
            onClickStatus={onClickStatus}
            onClickTag={onClickTag}
            onClickToggle={onClickToggle}
          />
        );
      })}
    </>
  );
};
