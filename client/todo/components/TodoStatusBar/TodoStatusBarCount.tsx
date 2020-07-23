import React from 'react';

import { StatusBarText } from '../../../shared/components/StatusBar';

export const TodoStatusBarCount: React.FunctionComponent<{
  selectedCount: number;
  totalCount: number;
}> = ({ selectedCount, totalCount }) => {
  const text =
    selectedCount > 0
      ? `${selectedCount} / ${totalCount} todos`
      : `${totalCount} todos`;

  return <StatusBarText text={text} />;
};
