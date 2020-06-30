import React from 'react';
import { useRouter } from 'next/router';
import { CategoryTodosPage } from '../../../client/components/pages/CategoryTodosPage';

export default () => {
  const router = useRouter();
  const categoryId = Number(router.query.categoryId);

  return <CategoryTodosPage categoryId={categoryId} />;
};
