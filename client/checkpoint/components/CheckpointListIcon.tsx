import React from 'react';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CheckpointIcon } from './CheckpointIcon';

export const CheckpointListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<CheckpointIcon />} />;
};
