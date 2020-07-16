import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
// @ts-ignore
import { Provider as NextAuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { THEME } from '../shared/theme/theme';
import { GlobalStyle } from './components/GlobalStyle';
import { PageContainer } from './containers/PageContainer';
import { createApolloClient } from './createApolloClient';
import { createReduxStore } from './createReduxStore';

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
  const store = createReduxStore();

  const App: React.FunctionComponent<Props> = ({
    Component,
    pageProps,
  }: Props) => {
    const { session } = pageProps;

    return (
      <ThemeProvider theme={THEME}>
        <ApolloProvider client={client}>
          <NextAuthProvider session={session}>
            <ReactReduxProvider store={store}>
              <GlobalStyle />
              <Head>
                <title>Todo</title>
              </Head>
              <PageContainer>
                <Component {...pageProps} />
              </PageContainer>
            </ReactReduxProvider>
          </NextAuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    );
  };

  return App;
}
