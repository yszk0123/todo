import React from 'react';
import { Flex } from 'rebass';

export const EditFormField: React.FunctionComponent<{ isFirst: boolean }> = ({
  isFirst = false,
  children,
}) => {
  return (
    <Flex alignItems="center" mt={isFirst ? 0 : 2}>
      {children}
    </Flex>
  );
};
