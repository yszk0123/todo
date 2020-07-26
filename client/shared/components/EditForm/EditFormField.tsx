import { Label } from '@rebass/forms';
import React from 'react';
import { Box, Flex } from 'rebass';

const LABEL_WIDTH = 100;

export const EditFormField: React.FunctionComponent<{
  htmlFor?: string;
  label?: string;
  rightElement?: JSX.Element | null;
}> = ({ children, htmlFor, label, rightElement }) => {
  return (
    <Flex alignItems="center" mt={2}>
      {label !== undefined && (
        <Label
          htmlFor={htmlFor}
          justifyContent="flex-end"
          mr={2}
          sx={{ flexShrink: 0 }}
          width={LABEL_WIDTH}
        >
          {label}
        </Label>
      )}
      {children}
      {rightElement != null ? (
        <Box ml={2} sx={{ flexShrink: 0 }}>
          {rightElement}
        </Box>
      ) : null}
    </Flex>
  );
};
