import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { TodosReportPage } from '../../../../client/todo_report';

const Page = () => {
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

export default Page;
