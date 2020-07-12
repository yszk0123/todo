import React from 'react';
import { Text } from 'rebass';

export const StatusBarText: React.FunctionComponent<{
  text: string;
}> = ({ text }) => {
  return <Text mx={2}>{text}</Text>;
};
