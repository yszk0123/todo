import React from 'react';

import { useTodosReportPageQuery } from '../../../graphql/__generated__/TodosReportPage.graphql';
import { ID } from '../../../viewModels/ID';
import { PageContent } from '../../layout/PageContent';
import { TodosReport } from './TodosReport';

type Props = {
  categoryId: ID;
};

export const TodosReportPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { data, loading } = useTodosReportPageQuery({
    variables: { categoryId, categoryUUID: categoryId },
  });

  if (loading || !data) {
    return null;
  }

  const todos = data.todos ?? [];
  const tags = data.tags ?? [];

  return (
    <PageContent>
      <TodosReport tags={tags} todos={todos} />
    </PageContent>
  );
};
