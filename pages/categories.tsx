import Head from 'next/head';
import React from 'react';

import { CategoriesPage } from '../client/category';

export default () => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>
      <CategoriesPage />
    </>
  );
};
