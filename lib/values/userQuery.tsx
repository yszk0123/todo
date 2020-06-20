import { selector } from 'recoil';
import { sdkDependency } from './sdkDependency';

export const userQuery = selector<{ name: string } | null>({
  key: 'userQuery',
  async get({ get }) {
    const sdk = get(sdkDependency);
    const data = await sdk.example();
    return data.me ?? null;
  },
});
