import Head from 'next/head';
import React from 'react';

import { CheckpointsPage } from '../client/views/pages/CheckpointsPage';

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
