import React from 'react';
import { Box, Flex } from 'rebass';

export const EditFormField: React.FunctionComponent<{
  rightElement?: JSX.Element | null;
}> = ({ rightElement, children }) => {
  return (
    <Flex alignItems="center" mb={2}>
      {children}
      {rightElement != null ? (
        <Box ml={2} sx={{ flexShrink: 0 }}>
          {rightElement}
        </Box>
      ) : null}
    </Flex>
  );
};
