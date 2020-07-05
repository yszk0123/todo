import React from 'react';
import { Box, Flex } from 'rebass';

export const EditFormField: React.FunctionComponent<{
  rightElement?: JSX.Element | null;
}> = ({ children, rightElement }) => {
  return (
    <Flex
      alignItems="center"
      flexWrap="wrap"
      mb={1}
      pb={1}
      sx={{
        borderBottom: '1px dotted lightgray',
        ':last-child': { borderBottom: 'none' },
      }}
    >
      {children}
      {rightElement != null ? (
        <Box ml={2} sx={{ flexShrink: 0 }}>
          {rightElement}
        </Box>
      ) : null}
    </Flex>
  );
};
