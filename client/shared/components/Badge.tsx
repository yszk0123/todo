import React from 'react';
import { Flex } from 'rebass';

export const Badge: React.FunctionComponent<{
  color?: string;
  icon?: JSX.Element;
  isReverseColor?: boolean;
  onClick?: () => void;
  text: string;
}> = ({ color = 'gray', icon, isReverseColor = false, onClick, text }) => {
  const isClickable = !!onClick;

  return (
    <Flex
      alignItems="center"
      aria-label={isClickable ? text : undefined}
      role={isClickable ? 'button' : undefined}
      sx={{
        color: isReverseColor ? 'black' : 'white',
        bg: color,
        cursor: isClickable ? 'pointer' : undefined,
      }}
      tabIndex={isClickable ? 0 : undefined}
      variant="badge"
    >
      {text}
      {!!icon && (
        <Flex ml={1} onClick={onClick}>
          {icon}
        </Flex>
      )}
    </Flex>
  );
};
