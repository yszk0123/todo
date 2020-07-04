import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import { CategoryTodosReportPage } from '../../../../client/components/pages/CategoryTodosReportPage';

export default () => {
  const router = useRouter();
  const categoryId = String(router.query.categoryId);

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <CategoryTodosReportPage categoryId={categoryId} />
    </>
  );
};
