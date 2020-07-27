import React from 'react';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CategoryIcon } from './CategoryIcon';

type Props = EmptyProps;

export const CategoryListIcon: React.FunctionComponent<Props> = () => {
  return <ListIcon icon={<CategoryIcon />} />;
};
