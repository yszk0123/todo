import React from 'react';
import { Text, Box } from 'rebass';

export const Loading: React.FunctionComponent<{}> = () => {
  return (
    <Box width="100vw" height="100vh">
      <Text>Loading...</Text>
    </Box>
  );
};
