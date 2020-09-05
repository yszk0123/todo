import React from 'react';
import { Flex } from 'rebass';

type Props = {
  id?: string;
};

const MiniList: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, id },
  ref
) => {
  return (
    <Flex alignItems="center" flexWrap="wrap" id={id} ref={ref}>
      {children}
    </Flex>
  );
};

const ForwardedMiniList = React.forwardRef(MiniList);

export { ForwardedMiniList as MiniList };
