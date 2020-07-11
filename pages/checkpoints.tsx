import Head from 'next/head';
import React from 'react';

import { CheckpointsPage } from '../client/checkpoint';

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
