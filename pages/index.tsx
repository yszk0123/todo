import Head from 'next/head';
import React from 'react';

import { DashboardPage } from '../client/dashboard';

const Page = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <DashboardPage />
    </>
  );
};

export default Page;
