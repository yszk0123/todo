import React from 'react';
import { Textarea } from '@rebass/forms';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import {
  CategoryTodosReportPageTodoFragment,
  CategoryTodosReportPageTagFragment,
} from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';

const MIN_HEIGHT = 300;

function printStatus(todo: CategoryTodosReportPageTodoFragment) {
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

function printReport(
  todos: CategoryTodosReportPageTodoFragment[],
  tags: CategoryTodosReportPageTagFragment[]
): string {
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

export const CategoryTodosReport: React.FunctionComponent<{
  todos: CategoryTodosReportPageTodoFragment[];
  tags: CategoryTodosReportPageTagFragment[];
}> = ({ todos, tags }) => {
  const output = React.useMemo(() => printReport(todos, tags), [todos, tags]);

  return <Textarea readOnly minHeight={MIN_HEIGHT} value={output} />;
};
