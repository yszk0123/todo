import React from 'react';
import {
  CategoryTodosReportPageTodoFragment,
  CategoryTodosReportPageTagFragment,
} from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';
import { ReportArea } from '../../layout/ReportArea';

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
  const text = [tagsString, todosString].join('\n');
  return `\`\`\`\n${text}\n\`\`\``;
}

export const CategoryTodosReport: React.FunctionComponent<{
  todos: CategoryTodosReportPageTodoFragment[];
  tags: CategoryTodosReportPageTagFragment[];
}> = ({ todos, tags }) => {
  const output = React.useMemo(() => printReport(todos, tags), [todos, tags]);
  return <ReportArea text={output} />;
};
