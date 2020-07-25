import React from 'react';

import { ReportArea } from '../../shared/components/ReportArea';
import { RootTagForReportFragment } from '../graphql/__generated__/TagForReport.graphql';
import { RootTodoForReportFragment } from '../graphql/__generated__/TodoForReport.graphql';
import { printTodosReport } from '../view_models/TodosReport';

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
