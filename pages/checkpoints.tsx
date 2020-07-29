import Head from 'next/head';
import React from 'react';

import { CheckpointsPage } from '../client/checkpoint';

const Page = () => {
  return (
    <>
      <Head>
        <title>Checkpoint</title>
      </Head>
      <CheckpointsPage />
    </>
  );
};

export default Page;
