declare module 'next-auth';

declare module 'next-auth/client' {
  type User = {
    name: string;
    email: string;
    image: string;
  };

  type Session = {
    user: User;
  };

  function useSession(): [Session | null | undefined, boolean];
}

declare module 'next-auth/jwt' {
  function getJwt(params: { req: any; secret: string }): Promise<unknown>;
}
