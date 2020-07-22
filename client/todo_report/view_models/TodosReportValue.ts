import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';

export type TodosReportItem = {
  status: TodoStatus;
  tags: string[];
  text: string;
  time: string;
};

declare function printTodosReportAsCSV(): string;

declare function printTodosReportAsMarkdown(): string;
