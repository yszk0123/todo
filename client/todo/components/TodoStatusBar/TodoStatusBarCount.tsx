import React from 'react';

import { StatusBarText } from '../../../shared/components/StatusBar';

export const TodoStatusBarCount: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  const text = `${count} todos`;

  return <StatusBarText text={text} />;
};
