import { Account, User } from '@prisma/client';

export type Token = {
  user: User;
  account: Account;
};
