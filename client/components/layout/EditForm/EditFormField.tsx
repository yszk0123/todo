import React from 'react';
import { Flex, Box } from 'rebass';

export const EditFormField: React.FunctionComponent<{
  isFirst: boolean;
  rightElement?: JSX.Element | null;
}> = ({ isFirst = false, rightElement, children }) => {
  return (
    <Flex alignItems="center" mt={isFirst ? 0 : 2}>
      {children}
      {rightElement != null ? (
        <Box ml={2} sx={{ flexShrink: 0 }}>
          {rightElement}
        </Box>
      ) : null}
    </Flex>
  );
};
