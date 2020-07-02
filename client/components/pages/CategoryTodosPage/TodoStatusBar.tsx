import React from 'react';
import { Text, Box } from 'rebass';
import { GoToReportLink } from './GoToReportLink';

export const TodoStatusBar: React.FunctionComponent<{
  categoryId: number;
  count: number;
}> = ({ categoryId, count }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <GoToReportLink categoryId={categoryId} />
      <Text textAlign="right" fontSize={2} color="gray">
        {count} todos
      </Text>
    </Box>
  );
};
