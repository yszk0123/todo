import React from 'react';
import ReactDOM from 'react-dom';
import { Flex } from 'rebass';

import { isSSR } from '../../helpers/isSSR';
import { stopPropagation } from '../../view_helpers/stopPropagation';

type Props = {
  isSelected?: boolean;
};

export const StatusBar: React.FunctionComponent<Props> = ({
  children,
  isSelected = false,
}) => {
  if (isSSR()) {
    return null;
  }

  return ReactDOM.createPortal(
    <Flex
      bg={isSelected ? 'gray' : 'background'}
      color={isSelected ? 'white' : 'gray'}
      fontSize={2}
      justifyContent="space-between"
      p={2}
      sx={{
        position: 'sticky',
        zIndex: 2,
        bottom: 0,
        boxShadow: 2,
        transition: 'background 0.3s ease-out',
      }}
      onClick={stopPropagation}
    >
      {children}
    </Flex>,
    document.body
  );
};
