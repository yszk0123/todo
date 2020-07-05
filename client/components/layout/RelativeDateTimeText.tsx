import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text } from 'rebass';

function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  const formatted = format(date, 'yyyy/MM/dd HH:mm');

  // FIXME: Avoid side effect
  const relative = formatDistanceToNow(date, { addSuffix: true });

  return `${relative}, ${formatted}`;
}

export const RelativeDateTimeText: React.FunctionComponent<{
  value: Date;
}> = ({ value }) => {
  const text = React.useMemo(() => formatDate(value), [value]);

  return <Text>{text}</Text>;
};
