import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { simplifyURL } from '../../shared/view_helpers/simplifyURL';
import { printTodoStatus } from '../../view_models/TodoStatus';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';

const statusToIndex = {
  [TodoStatus.Comment]: 0,
  [TodoStatus.InProgress]: 1,
  [TodoStatus.Todo]: 2,
  [TodoStatus.Waiting]: 3,
  [TodoStatus.Done]: 4,
};

const TIME_RE = /^(\d{2}:\d{2})[-~]/;
const TIME_WHOLE_RE = /^(\d{2}:\d{2}[-~])\s*(.*)$/;

const IGNORE_RE = /^\* /;

function getTime(text: string): number {
  const match = TIME_RE.exec(text);
  return match && match[1] ? Number(match[1].replace(/:/, '')) : 0;
}

function compareTag(a: TodoTagFragment, b: TodoTagFragment): number {
  return a.name.localeCompare(b.name);
}

function compareTags(a: TodoTagFragment[], b: TodoTagFragment[]): number {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    const name = compareTag(a[i], b[i]);
    if (name !== 0) return name;
  }
  return a.length - b.length;
}

function sortTodosByContent(todos: RootTodoFragment[]): RootTodoFragment[] {
  return [...todos]
    .sort((a, b) => {
      const time = getTime(a.text) - getTime(b.text);
      if (time !== 0) return time;
      const status = statusToIndex[a.status] - statusToIndex[b.status];
      if (status !== 0) return status;
      return compareTags(a.tags, b.tags);
    })
    .map((todo) => {
      const tags = [...todo.tags].sort(compareTag);
      return { ...todo, tags };
    });
}

export function printTodosReportAsMarkdown(todos: RootTodoFragment[]): string {
  const filteredTodos = sortTodosByContent(
    todos
      .filter((todo) => !IGNORE_RE.test(todo.text))
      .map((todo) => {
        const text = todo.text.replace(
          /(^|\s)(https?:\/\/[^\s]+)/g,
          (_, prefix, url) => `${prefix}${simplifyURL(url)}`
        );
        return { ...todo, text };
      })
  );
  const tasks = filteredTodos.filter((todo) => !TIME_RE.test(todo.text));
  const schedules = filteredTodos.filter((todo) => TIME_RE.test(todo.text));

  const tasksStringByTags = tasks
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.join(', ');
      const status = printTodoStatus(todo.status);
      return { tags, status, text };
    })
    .sort((a, b) => a.tags.localeCompare(b.tags))
    .reduce((acc, { status, tags, text }) => {
      const value = acc[tags] || [];
      const statusText = status !== null ? `[${status}] ` : '';
      const line = `${tags ? '  ' : ''}- ${statusText}${text}`;
      return { ...acc, [tags]: [...value, line] };
    }, {} as { [key: string]: string[] });
  const tasksString = Object.entries(tasksStringByTags)
    .map(([key, value]) => {
      return `${key}\n${value.join('\n')}`;
    })
    .join('\n');

  const schedulesString = schedules
    .map((todo) => {
      const text = todo.text;
      const tagNames = todo.tags.map((tag) => tag.name);
      const tags = tagNames.length ? `${tagNames.join(', ')}: ` : '';
      const match = TIME_WHOLE_RE.exec(todo.text);
      if (!match) return `- ${tags}${text}`;
      return `- ${match[1]} ${tags}${match[2]}`;
    })
    .join('\n');

  return [tasksString, '', schedulesString].join('\n').trim();
}

export function printTodosReportAsCSV(todos: RootTodoFragment[]): string {
  const filteredTodos = sortTodosByContent(
    todos
      .filter((todo) => !IGNORE_RE.test(todo.text))
      .map((todo) => {
        const text = todo.text.replace(
          /(^|\s)(https?:\/\/[^\s]+)/g,
          (_, prefix, url) => `${prefix}${simplifyURL(url)}`
        );
        return { ...todo, text };
      })
  );
  const tasks = filteredTodos.filter((todo) => !TIME_RE.test(todo.text));
  const schedules = filteredTodos.filter((todo) => TIME_RE.test(todo.text));

  const tasksString = tasks
    .map((todo) => {
      const text = todo.text;
      const status = printTodoStatusInPlainText(todo.status);
      return [status, text].join('\t');
    })
    .join('\n');

  const schedulesString = schedules
    .map((todo) => {
      const text = todo.text;
      const match = TIME_WHOLE_RE.exec(todo.text);
      const finalText = match ? match[2] : text;
      const status = printTodoStatusInPlainText(todo.status);
      return [status, finalText].join('\t');
    })
    .join('\n');

  const text = [tasksString, schedulesString].join('\n');
  return text;
}

function printTodoStatusInPlainText(status: TodoStatus): string {
  switch (status) {
    case TodoStatus.Todo:
      return 'Todo';
    case TodoStatus.InProgress:
      return 'In Progress';
    case TodoStatus.Waiting:
      return 'Waiting';
    case TodoStatus.Done:
      return 'Done';
    case TodoStatus.Comment:
      return 'Comment';
  }
}
