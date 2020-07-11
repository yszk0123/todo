import React from 'react';
import { MdCached, MdCheck } from 'react-icons/md';
import { Flex } from 'rebass';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import {
  StatusBar,
  StatusBarItemType,
} from '../../shared/components/StatusBar';
import { ID } from '../../viewModels/ID';

const animation = {
  animationName: 'rotation',
  animationIterationCount: 'infinite',
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
} as const;

const SyncStatus: React.FunctionComponent<{ isSyncing: boolean }> = ({
  isSyncing,
}) => {
  if (!isSyncing) {
    return <MdCheck />;
  }

  return (
    <Flex sx={animation}>
      <MdCached />
    </Flex>
  );
};

export const TodoStatusBar: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryId: ID | null;
  categoryName: string | null;
  count: number;
  isSyncing: boolean;
}> = ({ categories, categoryId, categoryName, count, isSyncing }) => {
  return (
    <StatusBar
      left={[
        ...(categoryId
          ? [
              {
                type: StatusBarItemType.LINK as const,
                content: {
                  href: '/categories/[categoryId]/todos/report',
                  as: `/categories/${categoryId}/todos/report`,
                  text: 'See report',
                },
              },
            ]
          : []),
        {
          type: StatusBarItemType.LINK as const,
          content: {
            href: '/todos',
            as: '/todos',
            text: 'All',
          },
        },
        ...categories.map((category) => {
          return {
            type: StatusBarItemType.LINK as const,
            content: {
              href: '/categories/[categoryId]/todos',
              as: `/categories/${category.id}/todos`,
              text: category.name,
            },
          };
        }),
      ]}
      right={[
        categoryName !== null
          ? { type: StatusBarItemType.TEXT, content: categoryName }
          : null,
        {
          type: StatusBarItemType.TEXT,
          content: `${count} todos`,
        },
        {
          type: StatusBarItemType.FLEX,
          content: <SyncStatus isSyncing={isSyncing} />,
        },
      ]}
    />
  );
};