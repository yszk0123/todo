import { selector } from 'recoil';
import { sdkDependency } from './sdkDependency';

export type User = { id: number; name: string };

export const userQuery = selector<User | null>({
  key: 'userQuery',
  async get({ get }) {
    const sdk = get(sdkDependency);
    const data = await sdk.user();
    return data.me ?? null;
  },
});
