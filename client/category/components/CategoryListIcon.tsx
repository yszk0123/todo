import React from 'react';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CategoryIcon } from './CategoryIcon';

export const CategoryListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<CategoryIcon />} />;
};
