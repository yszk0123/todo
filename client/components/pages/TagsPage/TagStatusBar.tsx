import React from 'react';

import { StatusBar, StatusBarItemType } from '../../layout/StatusBar';

export const TagStatusBar: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <StatusBar
      right={[{ type: StatusBarItemType.TEXT, content: `${count} tags` }]}
    />
  );
};
