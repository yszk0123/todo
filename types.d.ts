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
  type User = {
    name: string;
    email: string;
    image: string;
  };

  type Account = {
    provider: string;
    type: string;
    id: number;
    accessToken: string;
  };

  type Token = {
    user: User;
    account: Account;
  };

  function getJwt(params: { req: any; secret: string }): Promise<Token>;
}
