import React from 'react';
import { useRouter } from 'next/router';
import { CategoryTodosReportPage } from '../../../../client/components/pages/CategoryTodosReportPage';

export default () => {
  const router = useRouter();
  const categoryId = Number(router.query.categoryId);

  return <CategoryTodosReportPage categoryId={categoryId} />;
};