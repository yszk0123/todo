import React from 'react';

import { ID } from '../../../viewModels/ID';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TodosReport } from './TodosReport';
import { useTodosReportPageState } from './useTodosReportPageState';

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
