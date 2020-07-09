import React from 'react';
import { MdCheck } from 'react-icons/md';

import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ID } from '../../../viewModels/ID';
import { StatusBar, StatusBarItemType } from '../../layout/StatusBar';

export const TodoStatusBar: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryId: ID;
  categoryName: string | null;
  count: number;
}> = ({ categories, categoryId, categoryName, count }) => {
  return (
    <StatusBar
      left={[
        {
          type: StatusBarItemType.LINK,
          content: {
            href: '/categories/[categoryId]/todos/report',
            as: `/categories/${categoryId}/todos/report`,
            text: 'See report',
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
          content: <MdCheck />,
        },
      ]}
    />
  );
};
