import React from 'react';

import { ID } from '../../../../viewModels/ID';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { PageContent } from '../../../components/PageContent';
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
