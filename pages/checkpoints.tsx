import Head from 'next/head';
import React from 'react';

import { CheckpointsPage } from '../client/components/pages/CheckpointsPage';

export default () => {
  return (
    <>
      <Head>
        <title>Checkpoint</title>
      </Head>
      <CheckpointsPage />
    </>
  );
};
