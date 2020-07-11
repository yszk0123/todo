import React from 'react';

import { RootTagForReportFragment } from '../../../graphql/fragments/__generated__/RootTagForReport.graphql';
import { RootTodoForReportFragment } from '../../../graphql/fragments/__generated__/RootTodoForReport.graphql';
import { ReportArea } from '../../layout/ReportArea';
import { printTodosReport } from './printTodosReport';

export const TodosReport: React.FunctionComponent<{
  tags: RootTagForReportFragment[];
  todos: RootTodoForReportFragment[];
}> = ({ tags, todos }) => {
  const output = React.useMemo(() => printTodosReport(todos, tags), [
    todos,
    tags,
  ]);

  return <ReportArea text={output} />;
};
