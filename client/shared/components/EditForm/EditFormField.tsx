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
      {label !== undefined && (
        <Label
          htmlFor={htmlFor}
          justifyContent="flex-end"
          mr={2}
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
