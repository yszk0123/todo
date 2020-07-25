import React from 'react';
import { Flex } from 'rebass';

export const Badge: React.FunctionComponent<{
  color?: string;
  icon?: JSX.Element;
  isReverseColor?: boolean;
  onClick?: () => void;
  text: string;
}> = ({ color = 'gray', icon, isReverseColor = false, onClick, text }) => {
  return (
    <Flex
      alignItems="center"
      sx={{
        color: isReverseColor ? 'black' : 'white',
        bg: color,
      }}
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
