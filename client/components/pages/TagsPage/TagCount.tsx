import React from 'react';
import { Text, Box } from 'rebass';

export const TagCount: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <Box>
      <Text textAlign="right" fontSize={2} color="gray">
        {count} tags
      </Text>
    </Box>
  );
};
