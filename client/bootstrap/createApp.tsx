import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
// @ts-ignore
import { Provider as NextAuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { isMobile } from '../shared/helpers/isMobile';
import { isSSR } from '../shared/helpers/isSSR';
import { createTheme } from '../shared/theme/theme';
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
  const { persist } = createApolloClient();
  const store = createReduxStore();
  const mobile = !isSSR() && isMobile();
  const theme = createTheme(mobile);

  const App: React.FunctionComponent<Props> = ({
    Component,
    pageProps,
  }: Props) => {
    const { session } = pageProps;
    const [client, setClient] = React.useState<ApolloClient<unknown> | null>(
      null
    );

    React.useEffect(() => {
      persist((client) => setClient(client));
    }, []);

    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <title>Todo</title>
        </Head>
        {client !== null && (
          <ApolloProvider client={client}>
            <NextAuthProvider session={session}>
              <ReactReduxProvider store={store}>
                <PageContainer>
                  <Component {...pageProps} />
                </PageContainer>
              </ReactReduxProvider>
            </NextAuthProvider>
          </ApolloProvider>
        )}
      </ThemeProvider>
    );
  };

  return App;
}
