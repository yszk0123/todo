import React from 'react';

import { ID } from '../../view_models/ID';
import { groupTodoByCheckpoint } from '../../view_models/Todo';
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
  onClickStatus: (todo: RootTodoFragment) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (item: RootTodoFragment) => void;
  selectedTodoIds: ID[];
  todos: RootTodoFragment[];
}> = ({
  isCategoryNameShown,
  now,
  onClick,
  onClickCategory,
  onClickCheckpoint,
  onClickStatus,
  onClickTag,
  onClickToggle,
  selectedTodoIds,
  todos,
}) => {
  const groups = React.useMemo(() => groupTodoByCheckpoint(todos), [todos]);
  const isSelectMode = selectedTodoIds.length > 0;

  return (
    <>
      {groups.map((group, i) => {
        return (
          <TodoList
            group={group}
            isCategoryNameShown={isCategoryNameShown}
            isSelectMode={isSelectMode}
            key={`${group.header.name}-${i}`}
            now={now}
            selectedTodoIds={selectedTodoIds}
            onClick={onClick}
            onClickCategory={onClickCategory}
            onClickCheckpoint={onClickCheckpoint}
            onClickStatus={onClickStatus}
            onClickTag={onClickTag}
            onClickToggle={onClickToggle}
          />
        );
      })}
    </>
  );
};
