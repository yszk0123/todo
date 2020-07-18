import React from 'react';
import { Box, Flex, Text } from 'rebass';

const LABEL_WIDTH = 100;

export const EditFormField: React.FunctionComponent<{
  id?: string;
  label?: string;
  rightElement?: JSX.Element | null;
}> = ({ children, id, label, rightElement }) => {
  return (
    <Flex
      alignItems="center"
      flexWrap="wrap"
      id={id}
      mb={1}
      pb={1}
      sx={{
        borderBottom: '1px dotted lightgray',
        ':last-child': { borderBottom: 'none' },
      }}
    >
      {label !== undefined && (
        <Text minWidth={LABEL_WIDTH} mr={2} textAlign="right">
          {label}
        </Text>
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
