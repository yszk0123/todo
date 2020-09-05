import React from 'react';

/**
 * @see https://stackoverflow.com/a/60389122
 */
declare module 'react' {
  // augment React types
  function memo<A, B>(
    Component: (props: A) => B
  ): (props: A) => ReactElement | null;
  // return type is same as ReturnType<ExoticComponent<any>>

  function forwardRef<T, P>(
    renderFunction: (props: P, ref: React.Ref<T>) => ReactElement | null
  ): (props: P & { ref?: React.Ref<T> }) => ReactElement | null;
}

declare module 'next-auth';

declare module 'next-auth/client' {
  type User = {
    email: string;
    image: string;
    name: string;
  };

  type Session = {
    expires: string;
    user: User;
  };

  function useSession(): [Session | null | undefined, boolean];
}

declare module 'next-auth/jwt' {
  function getToken(params: { req: any; secret: string }): Promise<unknown>;
}
