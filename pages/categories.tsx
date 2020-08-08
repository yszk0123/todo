import Head from 'next/head';
import React from 'react';

import { CategoriesPage } from '../client/category';

const Page = () => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <CategoriesPage />
    </>
  );
};

export default Page;
