import React from 'react';
import { Text, Box } from 'rebass';

export const CategoryCount: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <Box>
      <Text textAlign="right" fontSize={2} color="gray">
        {count} categories
      </Text>
    </Box>
  );
};
