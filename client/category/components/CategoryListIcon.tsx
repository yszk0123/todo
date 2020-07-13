import React from 'react';
import { MdList } from 'react-icons/md';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';

export const CategoryListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<MdList />} />;
};
