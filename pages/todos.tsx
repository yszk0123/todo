import Head from 'next/head';
import React from 'react';

import { TodosPage } from '../client/todo';

const Page = () => {
  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <TodosPage />
    </>
  );
};

export default Page;
