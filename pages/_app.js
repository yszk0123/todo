import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { Gate } from '../lib/components/Gate';
import { createApolloClient } from '../lib/apollo/createApolloClient';

const client = createApolloClient();

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <ApolloProvider client={client}>
      <Provider session={session}>
        <Gate>
          <Component {...pageProps} />
        </Gate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
