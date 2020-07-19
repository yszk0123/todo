import React from 'react';
import { Flex } from 'rebass';

type Props = {
  id?: string;
};

export const MiniList: React.FunctionComponent<Props> = ({ children, id }) => {
  return (
    <Flex alignItems="center" flexWrap="wrap" id={id}>
      {children}
    </Flex>
  );
};
