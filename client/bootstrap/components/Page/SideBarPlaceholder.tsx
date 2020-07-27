import React from 'react';
import { Box } from 'rebass';

import { SIDE_BAR_ID } from '../../../shared/constants/SIDE_BAR_ID';
import { EmptyProps } from '../../../view_models/EmptyProps';

export const SideBarPlaceholder: React.FunctionComponent<EmptyProps> = () => {
  return <Box as="aside" id={SIDE_BAR_ID} />;
};
