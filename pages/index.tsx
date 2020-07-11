import Head from 'next/head';
import React from 'react';

import { DashboardPage } from '../client/dashboard';

export default () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <DashboardPage />
    </>
  );
};
