import React from 'react';

import {
  CategoryTodosReportPageTagFragment,
  CategoryTodosReportPageTodoFragment,
} from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { ReportArea } from '../../layout/ReportArea';
import { printTodosReport } from './printTodosReport';

export const CategoryTodosReport: React.FunctionComponent<{
  tags: CategoryTodosReportPageTagFragment[];
  todos: CategoryTodosReportPageTodoFragment[];
}> = ({ todos, tags }) => {
  const output = React.useMemo(() => printTodosReport(todos, tags), [
    todos,
    tags,
  ]);

  return <ReportArea text={output} />;
};
