import { format } from 'date-fns';
import React from 'react';
import { Text } from 'rebass';

function formatDate(date: Date): string {
  return format(new Date(date), 'HH:mm');
}

export const TimeText: React.FunctionComponent<{
  value: Date;
}> = ({ value }) => {
  const text = React.useMemo(() => formatDate(value), [value]);

  return <Text>{text}</Text>;
};
