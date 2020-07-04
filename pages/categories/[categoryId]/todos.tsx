import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { CategoryTodosPage } from '../../../client/components/pages/CategoryTodosPage';

export default () => {
  const router = useRouter();
  const categoryId = String(router.query.categoryId);

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <CategoryTodosPage categoryId={categoryId} />
    </>
  );
};
