declare module 'next-auth';

declare module 'next-auth/client' {
  type User = {
    email: string;
    image: string;
    name: string;
  };

  type Session = {
    user: User;
  };

  function useSession(): [Session | null | undefined, boolean];
}

declare module 'next-auth/jwt' {
  function getToken(params: { req: any; secret: string }): Promise<unknown>;
}
