import React from 'react';

import { useCategoryTodosReportPageQuery } from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';
import { ID } from '../../../viewModels/ID';
import { ContentWrapper } from '../../layout/ContentWrapper';
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
    <ContentWrapper>
      <CategoryTodosReport tags={tags} todos={todos} />
    </ContentWrapper>
  );
};
