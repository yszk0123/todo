import React from 'react';
import ReactDOM from 'react-dom';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';
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
      flexDirection="column-reverse"
      sx={{
        position: 'sticky',
        zIndex: 2,
        bottom: 0,
        boxShadow: 2,
      }}
      onClick={stopPropagation}
    >
      {children}
    </Flex>,
    document.body
  );
};
