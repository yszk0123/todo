import React from 'react';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { ID } from '../../view_models/ID';
import { TodosReport } from '../components/TodosReport';
import { useTodosReportPageState } from '../hooks/useTodosReportPageState';

type Props = {
  categoryId: ID;
};

export const TodosReportPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { isLoading, tags, todos } = useTodosReportPageState(categoryId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent>
      <TodosReport tags={tags} todos={todos} />
    </PageContent>
  );
};
