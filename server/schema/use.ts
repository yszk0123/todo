import { use } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';

import { getPrismaClient } from '../plugins/getPrismaClient';

const instance = getPrismaClient();

use(
  prisma({
    client: {
      instance,
    },
    features: {
      crud: true,
    },
  })
);
