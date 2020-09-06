import React from 'react';

import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { Selection } from '../../view_models/Selection';
import { groupTodoByCheckpoint } from '../../view_models/Todo';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoCheckpointFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../view_models/TodoSearchQuery';
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
  query: TodoSearchQuery;
  todoSelection: Selection;
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
  query,
  todoSelection,
  todos,
}) => {
  const groups = React.useMemo(() => groupTodoByCheckpoint(todos, query), [
    query,
    todos,
  ]);

  return (
    <>
      {groups.map((group, i) => {
        return (
          <TodoList
            group={group}
            isCategoryNameShown={isCategoryNameShown}
            key={`${group.header.name}-${i}`}
            now={now}
            query={query}
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
