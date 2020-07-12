import React from 'react';
import ReactDOM from 'react-dom';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../viewModels/EmptyProps';
import { isSSR } from '../../helpers/isSSR';
import { stopPropagation } from '../../view_helpers/stopPropagation';

export const StatusBar: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  if (isSSR()) {
    return null;
  }

  return ReactDOM.createPortal(
    <Flex
      bg="background"
      color="gray"
      fontSize={2}
      justifyContent="space-between"
      p={2}
      sx={{ position: 'sticky', zIndex: 2, bottom: 0 }}
      onClick={stopPropagation}
    >
      {children}
    </Flex>,
    document.body
  );
};
