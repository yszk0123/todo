import Head from 'next/head';
import React from 'react';

import { TodosPage } from '../client/todo';

export default () => {
  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <TodosPage categoryId={null} />
    </>
  );
};
