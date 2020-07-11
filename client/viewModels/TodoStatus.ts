import { TodoStatus } from '../shared/graphql/__generated__/baseTypes';

export function printTodoStatus(status: TodoStatus) {
  switch (status) {
    case TodoStatus.Todo:
      return ' ';
    case TodoStatus.InProgress:
      return '>';
    case TodoStatus.Waiting:
      return '-';
    case TodoStatus.Done:
      return 'x';
  }
}
