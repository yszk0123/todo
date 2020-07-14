import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Flex } from 'rebass';

import { isSSR } from '../helpers/isSSR';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FunctionComponent<Props> = ({
  children,
  isOpen,
  onClose,
}) => {
  const handleClickOuter = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClose();
    },
    [onClose]
  );

  if (isSSR() || !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Box
      px={2}
      py={4}
      sx={{
        position: 'fixed',
        zIndex: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      }}
      onClick={handleClickOuter}
    >
      <Flex
        alignItems="center"
        role="dialog"
        sx={{
          position: 'absolute',
          top: 4,
          left: 4,
          right: 4,
          bottom: 4,
          overflow: 'auto',
          borderRadius: 4,
          outline: 'none',
          tabindex: -1,
        }}
      >
        {children}
      </Flex>
    </Box>,
    document.body
  );
};
