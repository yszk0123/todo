import Head from 'next/head';
import React from 'react';

import { TagsPage } from '../client/tag';

export default () => {
  return (
    <>
      <Head>
        <title>Tag</title>
      </Head>
      <TagsPage />
    </>
  );
};
