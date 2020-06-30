import React from 'react';
import { Textarea } from '@rebass/forms';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import {
  CategoryTodosReportPageTodoFragment,
  CategoryTodosReportPageTagFragment,
} from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';

const MIN_HEIGHT = 300;

function printReport(
  todos: CategoryTodosReportPageTodoFragment[],
  tags: CategoryTodosReportPageTagFragment[]
): string {
  const tagsString = tags.map((tag) => tag.name).join(', ');
  const todosString = todos
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      const status = printTodoStatus(todo.status);
      return `- [${status}] ${tags}${text}`;
    })
    .join('\n');
  return [tagsString, todosString].join('\n');
}

export const CategoryTodosReport: React.FunctionComponent<{
  todos: CategoryTodosReportPageTodoFragment[];
  tags: CategoryTodosReportPageTagFragment[];
}> = ({ todos, tags }) => {
  const output = React.useMemo(() => printReport(todos, tags), [todos, tags]);

  return <Textarea readOnly minHeight={MIN_HEIGHT} value={output} />;
};
