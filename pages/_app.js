import Head from 'next/head';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../client/theme/theme';
import { PageContainer } from '../client/components/PageContainer';
import { createApolloClient } from '../client/apollo/createApolloClient';

import 'normalize.css';

const client = createApolloClient();

const AppHead = () => {
  return (
    <Head>
      <title>Todo</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

const AppBody = ({ Component, pageProps }) => {
  return (
    <PageContainer>
      <Component {...pageProps} />
    </PageContainer>
  );
};

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider session={session}>
          <AppHead />
          <AppBody Component={Component} pageProps={pageProps} />
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
