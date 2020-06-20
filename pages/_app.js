import { Provider } from 'next-auth/client';
import { RecoilRoot } from 'recoil';
import { Gate } from '../lib/components/Gate';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <RecoilRoot>
      <Provider session={session}>
        <Gate>
          <Component {...pageProps} />
        </Gate>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
