import React from 'react';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { CategoryTodosReport } from './CategoryTodosReport';
import { useCategoryTodosReportPageQuery } from '../../../graphql/__generated__/CategoryTodosReportPage.graphql';

type Props = {
  categoryId: number;
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
      <CategoryTodosReport todos={todos} tags={tags} />
    </ContentWrapper>
  );
};
