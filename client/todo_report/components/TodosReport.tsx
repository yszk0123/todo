import React from 'react';

import { ReportArea } from '../../shared/components/ReportArea';
import { RootTodoForReportFragment } from '../graphql/__generated__/TodoForReport.graphql';
import { printTodosReportAsMarkdown } from '../view_models/TodosReport';

export const TodosReport: React.FunctionComponent<{
  todos: RootTodoForReportFragment[];
}> = ({ todos }) => {
  const output = React.useMemo(() => printTodosReportAsMarkdown(todos), [
    todos,
  ]);

  return <ReportArea text={output} />;
};
