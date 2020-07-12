import React from 'react';

import { List } from '../../shared/components/List';
import { Note } from '../../shared/components/Note';
import { RelativeDateTimeText } from '../../shared/components/RelativeDateTimeText';
import { ID } from '../../view_models/ID';
import { groupTodoByCheckpoint, isPast } from '../../view_models/Todo';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoListItem } from './TodoListItem';

export const TodoList: React.FunctionComponent<{
  isCategoryNameShown: boolean;
  now: number;
  onClick: (item: RootTodoFragment) => void;
  onClickCategory: (category: TodoCategoryFragment) => void;
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
        const header = group.header;
        const todos = group.todos;
        const past = isPast(header.endAt, now);

        return (
          <List
            key={`${header.name}-${i}`}
            leftElement={header.name ? <Note text={header.name} /> : null}
            rightElement={
              header.endAt ? (
                <RelativeDateTimeText now={now} value={header.endAt} />
              ) : null
            }
            variant={past ? 'warning' : undefined}
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
      })}
    </>
  );
};
