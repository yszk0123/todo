import React from 'react';
import { TodoVM } from '../../../viewModels/TodoVM';
import { Textarea } from '@rebass/forms';

function printOutput(todos: TodoVM[]): string {
  return todos
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => `#${tag.name}`);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      return `- [ ] ${tags}${text}`;
    })
    .join('\n');
}

export const TodoOutput: React.FunctionComponent<{ todos: TodoVM[] }> = ({
  todos,
}) => {
  const output = React.useMemo(() => printOutput(todos), [todos]);

  return <Textarea readOnly value={output} />;
};
