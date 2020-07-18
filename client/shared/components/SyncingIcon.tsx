import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../view_models/EmptyProps';
import { SyncIcon } from './SyncIcon';

const animation = {
  animationName: 'rotation',
  animationIterationCount: 'infinite',
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
} as const;

export const SyncingIcon: React.FunctionComponent<EmptyProps> = () => {
  return (
    <Flex sx={animation}>
      <SyncIcon />
    </Flex>
  );
};
