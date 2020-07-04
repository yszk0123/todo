import Head from 'next/head';
import React from 'react';
import { CategoriesPage } from '../client/components/pages/CategoriesPage';

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
