import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
// @ts-ignore
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';

import { createApolloClient } from '../../apollo/createApolloClient';
import { theme } from '../../theme/theme';
import { PageContainer } from './PageContainer';

type PageProps = {
  [key: string]: unknown;
  session: unknown;
};

type Component = React.Factory<PageProps>;

type Props = {
  Component: Component;
  pageProps: PageProps;
};

export function createApp(): React.FunctionComponent<Props> {
  const client = createApolloClient();

  const App: React.FunctionComponent<Props> = ({
    Component,
    pageProps,
  }: Props) => {
    const { session } = pageProps;

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Provider session={session}>
            <Head>
              <title>Todo</title>
              <meta
                content="initial-scale=1.0, width=device-width"
                name="viewport"
              />
            </Head>
            <PageContainer>
              <Component {...pageProps} />
            </PageContainer>
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    );
  };

  return App;
}
