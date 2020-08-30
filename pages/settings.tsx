// TODO: Extract SettingsPage into client/
import { useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import { Button } from 'rebass';

const Page = () => {
  const client = useApolloClient();

  const handleClickGarbageCollection = React.useCallback(() => {
    client.cache.gc();
  }, [client]);

  const handleClickReset = React.useCallback(() => {
    client.cache.reset();
  }, [client]);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Button onClick={handleClickGarbageCollection}>Garbage Collection</Button>
      <Button onClick={handleClickReset}>Reset</Button>
    </>
  );
};

export default Page;
