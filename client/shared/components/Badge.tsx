import React from 'react';
import { Flex } from 'rebass';

export const Badge: React.FunctionComponent<{
  color?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  text: string;
}> = ({ color = 'gray', icon, onClick, text }) => {
  return (
    <Flex
      alignItems="center"
      sx={{
        color: 'white',
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
