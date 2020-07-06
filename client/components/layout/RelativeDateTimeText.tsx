import { format, formatDistance } from 'date-fns';
import React from 'react';
import { Text } from 'rebass';

function formatDate(dateString: Date, now: number): string {
  const date = new Date(dateString);
  const formatted = format(date, 'yyyy/MM/dd HH:mm');

  // FIXME: Avoid side effect
  const relative = formatDistance(date, now, { addSuffix: true });

  return `${relative}, ${formatted}`;
}

export const RelativeDateTimeText: React.FunctionComponent<{
  now: number;
  value: Date;
}> = ({ now, value }) => {
  const text = React.useMemo(() => formatDate(value, now), [now, value]);

  return <Text>{text}</Text>;
};
