import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { TodosReportPage } from '../../../../client/components/pages/TodosReportPage';

export default () => {
  const router = useRouter();
  const categoryId = String(router.query.categoryId);

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <TodosReportPage categoryId={categoryId} />
    </>
  );
};
