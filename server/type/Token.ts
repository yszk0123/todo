import { User, Account } from '@prisma/client';

export type Token = {
  user: User;
  account: Account;
};
