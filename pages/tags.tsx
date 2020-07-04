import Head from 'next/head';
import React from 'react';
import { TagsPage } from '../client/components/pages/TagsPage';

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
