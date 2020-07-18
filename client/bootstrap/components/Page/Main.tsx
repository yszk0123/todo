import React from 'react';
import { Flex } from 'rebass';

import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';

export const Main: React.FunctionComponent<{
  content: React.ReactNode;
  hasSession: boolean;
  isLoading: boolean;
}> = ({ content, hasSession, isLoading }) => {
  return (
    <Flex as="main" flexGrow={1} role="main">
      {isLoading ? <LoadingIndicator /> : hasSession && content}
    </Flex>
  );
};
