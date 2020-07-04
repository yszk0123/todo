/**
 * next-auth adapter for Prisma
 * @see https://github.com/iaincollins/next-auth/issues/151#issue-623537453
 */
import { PrismaClient, User } from '@prisma/client';

interface Profile {
  name: string;
  email: string;
  image: string;
}

export function PrismaAdapter({ client }: { client: PrismaClient }) {
  function debug(...args: any[]) {
    if (process.env.NODE_ENV === 'development') console.log(...args);
  }

  async function getAdapter() {
    // Called when a user signs in
    async function createUser(profile: Profile) {
      debug('Create user account', profile);
      return client.user.create({
        data: {
          name: profile.name,
          email: profile.email,
          avatarUrl: profile.image,
        },
      });
    }

    async function updateUser(user: User) {
      debug('Update user account', user);
      return new Promise((resolve, _reject) => {
        // @TODO Save changes to user object in DB
        resolve(true);
      });
    }

    async function getUserById(id = '') {
      debug('Get user account by ID', id);
      return client.user.findOne({ where: { id } });
    }

    async function getUserByProviderAccountId(
      providerId: string,
      providerAccountId: string
    ) {
      debug(
        'Get user account by provider account ID',
        providerId,
        providerAccountId
      );
      return client.account
        .findOne({
          where: { providerAccountId },
        })
        .user();
    }

    async function getUserByEmail(email: string) {
      debug('Get user account by email address', email);
      return new Promise((resolve, _reject) => {
        // @TODO Get user from DB
        resolve(false);
      });
    }

    async function getUserByCredentials(credentials: string) {
      debug('Get user account by credentials', credentials);
      return new Promise((resolve, _reject) => {
        // @TODO Get user from DB
        resolve(true);
      });
    }

    async function deleteUserById(userId: string) {
      debug('Delete user account', userId);
      return new Promise((resolve, _reject) => {
        // @TODO Delete user from DB
        resolve(true);
      });
    }

    async function linkAccount(
      userId: string,
      providerId: string,
      providerType: string,
      providerAccountId: string,
      refreshToken: string,
      accessToken: string,
      accessTokenExpires: string
    ) {
      debug(
        'Link provider account',
        userId,
        providerId,
        providerType,
        providerAccountId,
        refreshToken,
        accessToken,
        accessTokenExpires
      );
      return client.account.create({
        data: {
          accessToken,
          refreshToken,
          providerAccountId,
          providerId,
          providerType,
          user: {
            connect: {
              id: userId,
            },
          },
          accessTokenExpires,
        },
      });
    }

    async function unlinkAccount(
      userId: string,
      providerId: string,
      providerAccountId: string
    ) {
      debug('Unlink provider account', userId, providerId, providerAccountId);
      return new Promise((resolve, _reject) => {
        // @TODO Get current user from DB
        // @TODO Delete [provider] object from user object
        // @TODO Save changes to user object in DB
        resolve(true);
      });
    }

    async function createSession(_user: User) {
      throw new Error('To Be Implemented');
    }

    async function getSessionById(_id = '') {
      throw new Error('To Be Implemented');
    }

    async function deleteSessionById(_id: string) {
      throw new Error('To Be Implemented');
    }

    return Promise.resolve({
      createUser,
      updateUser,
      getUserById,
      getUserByProviderAccountId,
      getUserByEmail,
      getUserByCredentials,
      deleteUserById,
      linkAccount,
      unlinkAccount,
      createSession,
      getSessionById,
      deleteSessionById,
    });
  }

  return {
    getAdapter,
  };
}
