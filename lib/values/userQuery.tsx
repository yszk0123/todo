import { selector } from 'recoil';
import { sdkDependency } from './sdkDependency';

export const userQuery = selector<{ id: number; name: string } | null>({
  key: 'userQuery',
  async get({ get }) {
    const sdk = get(sdkDependency);
    const data = await sdk.user();
    return data.me ?? null;
  },
});
