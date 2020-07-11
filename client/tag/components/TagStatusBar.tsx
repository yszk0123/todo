import React from 'react';
import { MdLabel } from 'react-icons/md';

import {
  StatusBar,
  StatusBarItemType,
} from '../../shared/components/StatusBar';

export const TagStatusBar: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <StatusBar
      right={[
        { type: StatusBarItemType.TEXT, content: `${count} tags` },
        { type: StatusBarItemType.FLEX, content: <MdLabel /> },
      ]}
    />
  );
};
