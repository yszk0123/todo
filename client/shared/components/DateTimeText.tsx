import { format } from 'date-fns';
import React from 'react';
import { Text } from 'rebass';

import { DateTime, parseDateTime } from '../../view_models/DateTime';

function formatDate(date: DateTime): string {
  return format(parseDateTime(date), 'yyyy/MM/dd HH:mm');
}

export const DateTimeText: React.FunctionComponent<{
  value: DateTime;
}> = ({ value }) => {
  const text = React.useMemo(() => formatDate(value), [value]);

  return <Text>{text}</Text>;
};
