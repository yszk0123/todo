import React from 'react';

import { List } from '../../../shared/components/List';
import { Note } from '../../../shared/components/Note';
import { RelativeDateTimeText } from '../../../shared/components/RelativeDateTimeText';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { isPast, TodoGroup } from '../../../view_models/Todo';
import { Selection } from '../../../view_models/TodoSelection';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoCheckpointFragment,
  TodoTagFragment,
} from '../../graphql/__generated__/Todo.graphql';
import { TodoListItem } from './TodoListItem';

export function TodoList({
  group,
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
}: {
  group: TodoGroup;
  isCategoryNameShown: boolean;
  now: number;
  onClick: (item: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
  onClickCheckpoint: (checkpoint: TodoCheckpointFragment) => void;
  onClickExpand: (todo: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment, status: TodoStatus) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (item: RootTodoFragment) => void;
  todoSelection: Selection;
}): JSX.Element {
  const header = group.header;
  const todos = group.todos;
  const past = isPast(header.endAt, now);

  const handleClickCheckpoint = React.useCallback(() => {
    if (group.checkpoint !== null) {
      onClickCheckpoint(group.checkpoint);
    }
  }, [group.checkpoint, onClickCheckpoint]);

  return (
    <List
      leftElement={header.name ? <Note text={header.name} /> : null}
      rightElement={
        header.endAt ? (
          <RelativeDateTimeText now={now} value={header.endAt} />
        ) : null
      }
      variant={past ? 'warning' : undefined}
      onClickHeader={handleClickCheckpoint}
    >
      {todos.map((todo) => {
        return (
          <TodoListItem
            isCategoryNameShown={isCategoryNameShown}
            key={todo.id}
            todo={todo}
            todoSelection={todoSelection}
            onClick={onClick}
            onClickCategory={onClickCategory}
            onClickExpand={onClickExpand}
            onClickStatus={onClickStatus}
            onClickTag={onClickTag}
            onClickToggle={onClickToggle}
          />
        );
      })}
    </List>
  );
}
