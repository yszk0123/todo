import React from 'react';
import ReactDOM from 'react-dom';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';
import { isSSR } from '../../helpers/isSSR';
import { useFooter } from '../../hooks/useFooter';
import { stopPropagation } from '../../view_helpers/stopPropagation';

export const StatusBar: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  const footer = useFooter();

  if (isSSR() || footer === null) {
    return null;
  }

  return ReactDOM.createPortal(
    <Flex flexDirection="column" width="100%" onClick={stopPropagation}>
      {children}
    </Flex>,
    footer
  );
};
