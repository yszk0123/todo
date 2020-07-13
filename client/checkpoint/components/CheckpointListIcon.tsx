import React from 'react';
import { MdPlace } from 'react-icons/md';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';

export const CheckpointListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<MdPlace />} />;
};
