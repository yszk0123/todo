import React from 'react';
import Popoever from 'react-tiny-popover';
import { Box } from 'rebass';

const WINDOW_BORDER_PADDING = 8;
const TRANSITION_DURATION = 0;

type Props = {
  // Popover does not accept React.React.Node
  children: JSX.Element;

  content: JSX.Element;
  isOpen: boolean;
  onClickOutside: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
};

export function Popover({
  children,
  content,
  isOpen,
  onClickOutside,
  position,
}: Props): JSX.Element {
  return (
    <Popoever
      content={
        // FIXME: Remove Box
        <Box bg="background">{content}</Box>
      }
      isOpen={isOpen}
      position={position}
      transitionDuration={TRANSITION_DURATION}
      windowBorderPadding={WINDOW_BORDER_PADDING}
      onClickOutside={onClickOutside}
    >
      {children}
    </Popoever>
  );
}
