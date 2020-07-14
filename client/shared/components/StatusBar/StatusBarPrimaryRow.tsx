import React from 'react';
import { Flex } from 'rebass';

export const StatusBarPrimaryRow: React.FunctionComponent<{
  isSelected: boolean;
}> = ({ children, isSelected }) => {
  return (
    <Flex
      bg={isSelected ? 'gray' : 'background'}
      color={isSelected ? 'white' : 'gray'}
      fontSize={2}
      justifyContent="space-between"
      p={2}
      sx={{
        transition: 'background 0.3s ease-out',
      }}
    >
      {children}
    </Flex>
  );
};
