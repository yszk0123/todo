// FIXME: Use layout components instead of using rebass directly
import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { ListItem } from '../../shared/components/List';
import { RelativeDateTimeText } from '../../shared/components/RelativeDateTimeText';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';

export const CheckpointListItem: React.FunctionComponent<{
  checkpoint: RootCheckpointFragment;
  isSelectMode: boolean;
  isSelected: boolean;
  now: number;
  onClick: (checkpoint: RootCheckpointFragment) => void;
  onClickCheckbox: (checkpoint: RootCheckpointFragment) => void;
}> = ({
  checkpoint,
  isSelectMode,
  isSelected,
  now,
  onClick,
  onClickCheckbox,
}) => {
  const handleClickCheckbox = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClickCheckbox(checkpoint);
    },
    [checkpoint, onClickCheckbox]
  );

  return (
    <ListItem
      isActive={isSelected}
      item={checkpoint}
      leftElement={
        isSelectMode ? (
          <Box onClick={handleClickCheckbox}>
            <Checkbox checked={isSelected} marginRight={0} readOnly />
          </Box>
        ) : undefined
      }
      mainElement={checkpoint.name ?? ''}
      rightElement={<RelativeDateTimeText now={now} value={checkpoint.endAt} />}
      onClick={onClick}
    />
  );
};
