import React from 'react';
import { useSession } from 'next-auth/client';

export const Gate: React.FunctionComponent<{}> = ({ children }) => {
  const [session, _loading] = useSession();

  if (!session) {
    return (
      <p>
        Not signed in <br />
        <a href="/api/auth/signin">Sign in</a>
      </p>
    );
  }

  return (
    <div>
      Signed in as {session.user.email} <br />
      <a href="/api/auth/signout">Sign out</a>
      {children}
    </div>
  );
};
