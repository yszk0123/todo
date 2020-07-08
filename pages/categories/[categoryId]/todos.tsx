import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { TodosPage } from '../../../client/components/pages/TodosPage';

export default () => {
  const router = useRouter();
  const categoryId = String(router.query.categoryId);

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <TodosPage categoryId={categoryId} />
    </>
  );
};
