import React from 'react';
import { Text, Box, Flex } from 'rebass';
import { GoToReportLink } from './GoToReportLink';
import { ID } from '../../../viewModels/ID';

export const TodoStatusBar: React.FunctionComponent<{
  categoryId: ID;
  categoryName: string | null;
  count: number;
}> = ({ categoryId, categoryName, count }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} fontSize={2}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'gray',
        }}
      >
        <GoToReportLink categoryId={categoryId} />
      </Flex>
      <Flex
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'gray',
        }}
      >
        {categoryName && <Text>{categoryName}</Text>}
        <Text ml={2}>{count} todos</Text>
      </Flex>
    </Box>
  );
};
