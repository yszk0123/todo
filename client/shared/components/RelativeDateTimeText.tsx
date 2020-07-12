import { format, formatDistance } from 'date-fns';
import React from 'react';
import { Text } from 'rebass';

import { DateTime, parseDateTime } from '../../view_models/DateTime';

function formatDate(dateString: DateTime, now: number): string {
  const date = parseDateTime(dateString);
  const formatted = format(date, 'yyyy/MM/dd HH:mm');

  // FIXME: Avoid side effect
  const relative = formatDistance(date, now, { addSuffix: true });

  return `${relative}, ${formatted}`;
}

export const RelativeDateTimeText: React.FunctionComponent<{
  now: number;
  value: DateTime;
}> = ({ now, value }) => {
  const text = React.useMemo(() => formatDate(value, now), [now, value]);

  return <Text>{text}</Text>;
};
