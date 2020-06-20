import React from 'react';
import { useSession } from 'next-auth/client';
import Hoge from './GraphQLRequestExample';

const Gate: React.FunctionComponent<{}> = ({ children }) => {
  const [session, _loading] = useSession();

  if (!session) {
    return (
      <p>
        Not signed in <br />
        <a href="/api/auth/signin">Sign in</a>
      </p>
    );
  }
  console.log('SESSION', session);

  return (
    <p>
      Signed in as {session.user.email} <br />
      <a href="/api/auth/signout">Sign out</a>
      {children}
      <Hoge />
    </p>
  );
};

const HomePage: React.FunctionComponent<{}> = () => {
  return (
    <Gate>
      <div>Hello, world!</div>
    </Gate>
  );
};

export default HomePage;
