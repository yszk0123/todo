import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../lib/theme/theme';
import { Gate } from '../lib/components/Gate';
import { createApolloClient } from '../lib/apollo/createApolloClient';

import 'normalize.css';

const client = createApolloClient();

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider session={session}>
          <Gate>
            <Component {...pageProps} />
          </Gate>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
