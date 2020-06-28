import React from 'react';
import { TodoVM } from '../../../viewModels/TodoVM';
import { Textarea } from '@rebass/forms';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';

function printStatus(todo: TodoVM) {
  switch (todo.status) {
    case TodoStatus.Todo:
      return '[ ]';
    case TodoStatus.InProgress:
      return '[-]';
    case TodoStatus.Waiting:
      return '[>]';
    case TodoStatus.Done:
      return '[x]';
  }
}

function printOutput(todos: TodoVM[]): string {
  return todos
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      const status = printStatus(todo);
      return `- ${status} ${tags}${text}`;
    })
    .join('\n');
}

export const TodoOutput: React.FunctionComponent<{ todos: TodoVM[] }> = ({
  todos,
}) => {
  const output = React.useMemo(() => printOutput(todos), [todos]);

  return <Textarea readOnly value={output} />;
};
