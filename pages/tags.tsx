import Head from 'next/head';
import React from 'react';

import { TagsPage } from '../client/tag';

const Page = () => {
  return (
    <>
      <Head>
        <title>Tag</title>
      </Head>
      <TagsPage />
    </>
  );
};

export default Page;
