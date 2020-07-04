import React from 'react';
import { Box, Flex } from 'rebass';

export const StatusBar: React.FunctionComponent<{
  left: React.ReactNode;
  right: React.ReactNode;
}> = ({ left, right }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} fontSize={2}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'gray',
        }}
      >
        {left}
      </Flex>
      <Flex
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'gray',
        }}
      >
        {right}
      </Flex>
    </Box>
  );
};
