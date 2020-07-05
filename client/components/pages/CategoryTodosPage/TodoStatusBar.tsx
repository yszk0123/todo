import React from 'react';

import { ID } from '../../../viewModels/ID';
import { StatusBar, StatusBarItemType } from '../../layout/StatusBar';

export const TodoStatusBar: React.FunctionComponent<{
  categoryId: ID;
  categoryName: string | null;
  count: number;
}> = ({ categoryId, categoryName, count }) => {
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
      ]}
      right={[
        categoryName !== null
          ? { type: StatusBarItemType.TEXT, content: categoryName }
          : null,
        { type: StatusBarItemType.TEXT, content: `${count} todos` },
      ]}
    />
  );
};
