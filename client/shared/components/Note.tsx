import React from 'react';
import { Text } from 'rebass';

export const Note: React.FunctionComponent<{
  text: string;
}> = ({ text }) => {
  return <Text>{text}</Text>;
};
