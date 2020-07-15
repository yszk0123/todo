import React from 'react';

import { List } from '../../../shared/components/List';
import { Note } from '../../../shared/components/Note';
import { RelativeDateTimeText } from '../../../shared/components/RelativeDateTimeText';
import { isPast, TodoGroup } from '../../../view_models/Todo';
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
  isSelectMode,
  now,
  onClick,
  onClickCategory,
  onClickCheckpoint,
  onClickStatus,
  onClickTag,
  onClickToggle,
  selectedTodoIds,
}: {
  group: TodoGroup;
  isCategoryNameShown: boolean;
  isSelectMode: boolean;
  now: number;
  onClick: (item: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
  onClickCheckpoint: (checkpoint: TodoCheckpointFragment) => void;
  onClickStatus: (todo: RootTodoFragment) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (item: RootTodoFragment) => void;
  selectedTodoIds: string[];
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
        const isSelected = selectedTodoIds.includes(todo.id);

        return (
          <TodoListItem
            isCategoryNameShown={isCategoryNameShown}
            isSelected={isSelected}
            isSelectMode={isSelectMode}
            key={todo.id}
            todo={todo}
            onClick={onClick}
            onClickCategory={onClickCategory}
            onClickStatus={onClickStatus}
            onClickTag={onClickTag}
            onClickToggle={onClickToggle}
          />
        );
      })}
    </List>
  );
}