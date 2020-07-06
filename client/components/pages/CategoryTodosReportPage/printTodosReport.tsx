import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import {
  CategoryTodosReportPageTagFragment,
  CategoryTodosReportPageTodoFragment,
} from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { printTodoStatus } from '../../../viewModels/TodoStatus';
import { simplifyURL } from '../../helpers/simplifyURL';

const statusToIndex = {
  [TodoStatus.Todo]: 0,
  [TodoStatus.InProgress]: 1,
  [TodoStatus.Waiting]: 2,
  [TodoStatus.Done]: 3,
};

const TIME_RE = /^(\d{2}:\d{2})[-~]/;
const TIME_WHOLE_RE = /^(\d{2}:\d{2}[-~])(.*)$/;

const IGNORE_RE = /^\* /;

function getTime(text: string): number {
  const match = TIME_RE.exec(text);
  return match && match[1] ? Number(match[1].replace(/:/, '')) : 0;
}

export function printTodosReport(
  todos: CategoryTodosReportPageTodoFragment[],
  tags: CategoryTodosReportPageTagFragment[]
): string {
  const filteredTodos = todos
    .filter((todo) => !IGNORE_RE.test(todo.text))
    .map((todo) => {
      const text = todo.text.replace(
        /(^|\s)(https?:\/\/[^\s]+)/g,
        (_, prefix, url) => `${prefix}${simplifyURL(url)}`
      );
      return { ...todo, text };
    });
  const tagsString = tags.map((tag) => tag.name).join(', ');
  const tasks = filteredTodos.filter((todo) => !TIME_RE.test(todo.text));
  const schedules = filteredTodos.filter((todo) => TIME_RE.test(todo.text));

  const tasksString = tasks
    .sort((a, b) => statusToIndex[a.status] - statusToIndex[b.status])
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      const status = printTodoStatus(todo.status);
      return `- [${status}] ${tags}${text}`;
    })
    .join('\n');

  const schedulesString = schedules
    .sort((a, b) => getTime(a.text) - getTime(b.text))
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      const match = TIME_WHOLE_RE.exec(todo.text);
      if (!match) return `- ${tags}${text}`;
      return `- ${match[1]} ${tags}${match[2]}`;
    })
    .join('\n');

  const text = [tagsString, tasksString, '', schedulesString].join('\n');

  return `\`\`\`\n${text}\n\`\`\``;
}
