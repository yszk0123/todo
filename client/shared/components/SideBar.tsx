import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Flex } from 'rebass';

import { isSSR } from '../helpers/isSSR';
import { useSideBar } from '../hooks/useSideBar';

type Props = {
  isOpen: boolean;
  // FIXME: Use
  onClose: () => void;
};

export const SideBar: React.FunctionComponent<Props> = ({
  children,
  isOpen,
}) => {
  const sideBar = useSideBar();

  if (isSSR() || !isOpen || sideBar === null) {
    return null;
  }

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        bg: 'background',
        boxShadow: 2,
        height: '100%',
        width: '100%',
      }}
    >
      <Flex
        flexDirection="column"
        p={2}
        sx={{ position: 'relative', overflow: 'auto' }}
      >
        {children}
      </Flex>
    </Box>,
    sideBar
  );
};
