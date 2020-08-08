import { User } from '@prisma/client';
import { schema } from 'nexus';

import { getPrismaClient } from '../../plugins/getPrismaClient';
import { getJWT } from '../helpers/getJWT';

// Prevent nexus build error
// > node_modules/@types/typegen-nexus-context/index.d.ts:15:58 - error TS1005: ',' expected.
// > 15 interface Context { token: Token; } | { token?: undefined; }
// @see https://github.com/graphql-nexus/nexus/pull/1057
const add = schema.addToContext;
add(async (req) => {
  try {
    const { userId } = await getJWT(req);
    const client = getPrismaClient();
    const user = await client.user.findOne({ where: { id: userId } });
    return { user };
  } catch {
    return {};
  }
});

declare global {
  interface NexusContext {
    user?: User;
  }
}
