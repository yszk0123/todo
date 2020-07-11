import Head from 'next/head';
import React from 'react';

import { IndexPage } from '../client/views/pages/IndexPage';

export default () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <IndexPage />
    </>
  );
};
