import React from 'react';

import { ListIcon } from '../../shared/components/List';
import { EmptyProps } from '../../view_models/EmptyProps';
import { TagIcon } from './TagIcon';

export const TagListIcon: React.FunctionComponent<EmptyProps> = () => {
  return <ListIcon icon={<TagIcon />} />;
};
