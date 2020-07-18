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
        whiteSpace: 'nowrap',
        px: 2,
        py: 1,
        fontSize: 10,
        borderRadius: 9999,
        border: '1px solid',
        borderColor: 'dark',
      }}
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
