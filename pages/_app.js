import { Provider } from 'next-auth/client';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <RecoilRoot>
      <Provider session={session}>
        <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  );
};

export default App;
