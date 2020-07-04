import React from 'react';
import { StatusBar, StatusBarItemType } from '../../layout/StatusBar';

export const CategoryStatusBar: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <StatusBar
      right={[{ type: StatusBarItemType.TEXT, content: `${count} categories` }]}
    />
  );
};
