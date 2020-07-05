import { Account, User } from '@prisma/client';

export type Token = {
  account: Account;
  user: User;
};
