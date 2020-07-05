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
  const { loading, data } = useCategoryTodosReportPageQuery({
    variables: { categoryId },
  });

  if (loading || !data) {
    return null;
  }

  const todos = data.category?.todos ?? [];
  const tags = data.category?.tags ?? [];

  return (
    <PageContent>
      <CategoryTodosReport tags={tags} todos={todos} />
    </PageContent>
  );
};
