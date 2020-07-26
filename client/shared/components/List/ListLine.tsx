import React from 'react';
import { Flex } from 'rebass';

type Props = {
  hasStrikeThrough?: boolean;
  leftElement?: JSX.Element | null;
  rightElement?: JSX.Element | null;
};

export const ListLine: React.FunctionComponent<Props> = ({
  leftElement,
  rightElement,
}) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      {leftElement}
      {rightElement}
    </Flex>
  );
};
