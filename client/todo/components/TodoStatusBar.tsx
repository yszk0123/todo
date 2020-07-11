import React from 'react';
import { MdCached, MdCheck } from 'react-icons/md';
import { Flex } from 'rebass';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import {
  StatusBar,
  StatusBarItemType,
} from '../../shared/components/StatusBar';

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
  category: RootCategoryFragment | null;
  count: number;
  isSyncing: boolean;
}> = ({ categories, category, count, isSyncing }) => {
  return (
    <StatusBar
      left={[
        ...(category
          ? [
              {
                type: StatusBarItemType.LINK as const,
                content: {
                  href: '/categories/[categoryId]/todos/report',
                  as: `/categories/${category.id}/todos/report`,
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
        ...categories.map((c) => {
          return category && c.id !== category.id
            ? {
                type: StatusBarItemType.LINK as const,
                content: {
                  href: '/categories/[categoryId]/todos',
                  as: `/categories/${c.id}/todos`,
                  text: c.name,
                },
              }
            : {
                type: StatusBarItemType.TEXT as const,
                content: c.name,
              };
        }),
      ]}
      right={[
        category !== null
          ? { type: StatusBarItemType.TEXT, content: category.name }
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
