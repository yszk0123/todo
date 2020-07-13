import React from 'react';
import { MdLabel } from 'react-icons/md';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';

export const TagListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<MdLabel />} />;
};
