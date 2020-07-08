import React from 'react';

import { useCategoryTodosReportPageQuery } from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { ID } from '../../../viewModels/ID';
import { PageContent } from '../../layout/PageContent';
import { CategoryTodosReport } from './CategoryTodosReport';

type Props = {
  categoryId: ID;
};

export const CategoryTodosReportPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { data, loading } = useCategoryTodosReportPageQuery({
    variables: { categoryId, categoryUUID: categoryId },
  });

  if (loading || !data) {
    return null;
  }

  const todos = data.todos ?? [];
  const tags = data.tags ?? [];

  return (
    <PageContent>
      <CategoryTodosReport tags={tags} todos={todos} />
    </PageContent>
  );
};
