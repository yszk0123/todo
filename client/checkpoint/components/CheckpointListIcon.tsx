import React from 'react';

import { ListIconCheckbox } from '../../shared/components/List';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { CheckpointIcon } from './CheckpointIcon';

type Props = {
  checkpoint: RootCheckpointFragment;
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (checkpoint: RootCheckpointFragment) => void;
};

export const CheckpointListIcon: React.FunctionComponent<Props> = ({
  checkpoint,
  isSelectMode,
  isSelected,
  onClick,
}) => {
  return (
    <ListIconCheckbox
      icon={isSelectMode ? null : CheckpointIcon}
      isSelected={isSelected}
      item={checkpoint}
      onClick={onClick}
    />
  );
};
