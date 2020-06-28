import React from 'react';
import { useRouter } from 'next/router';
import { TodosPage } from '../../../client/components/pages/TodosPage';

export default () => {
  const router = useRouter();
  const categoryId = Number(router.query.categoryId);

  return <TodosPage categoryId={categoryId} />;
};
