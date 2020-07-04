import React from 'react';
import { Text } from 'rebass';
import { GoToReportLink } from './GoToReportLink';
import { ID } from '../../../viewModels/ID';
import { StatusBar } from '../../layout/StatusBar';

export const TodoStatusBar: React.FunctionComponent<{
  categoryId: ID;
  categoryName: string | null;
  count: number;
}> = ({ categoryId, categoryName, count }) => {
  return (
    <StatusBar
      left={<GoToReportLink categoryId={categoryId} />}
      right={
        <>
          {categoryName && <Text>{categoryName}</Text>}
          <Text ml={2}>{count} todos</Text>
        </>
      }
    />
  );
};
