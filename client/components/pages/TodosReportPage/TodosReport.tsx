import React from 'react';

import {
  TodosReportPageTagFragment,
  TodosReportPageTodoFragment,
} from '../../../graphql/__generated__/TodosReportPage.graphql';
import { ReportArea } from '../../layout/ReportArea';
import { printTodosReport } from './printTodosReport';

export const TodosReport: React.FunctionComponent<{
  tags: TodosReportPageTagFragment[];
  todos: TodosReportPageTodoFragment[];
}> = ({ tags, todos }) => {
  const output = React.useMemo(() => printTodosReport(todos, tags), [
    todos,
    tags,
  ]);

  return <ReportArea text={output} />;
};
