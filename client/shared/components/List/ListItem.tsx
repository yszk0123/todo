import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { Key } from '../../constants/KeyCode';

export function ListItem<T>({
  isActive = false,
  item,
  leftElement,
  mainElement,
  onClick,
  rightElement,
}: {
  isActive?: boolean;
  item: T;
  leftElement?: JSX.Element | null;
  mainElement: JSX.Element | string;
  onClick?: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (onClick) {
        event.stopPropagation();
        onClick(item);
      }
    },
    [item, onClick]
  );
  const handleSpace = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.keyCode === Key.Space && onClick) {
        event.stopPropagation();
        event.preventDefault();
        onClick(item);
      }
    },
    [item, onClick]
  );

  return (
    <Flex
      alignItems="center"
      bg={isActive ? 'highlight' : undefined}
      flex="1 1 auto"
      p={2}
      sx={{
        cursor: 'pointer',
        borderBottom: '1px dotted',
        borderColor: 'gray',
        ':last-child': { borderBottom: 'none' },
      }}
      tabIndex={0}
      variant="listItem"
      onClick={handleClick}
      onKeyDown={handleSpace}
    >
      {leftElement != null && (
        <Flex alignItems="center" flexShrink={0} mr={2}>
          {leftElement}
        </Flex>
      )}
      <Box sx={{ flexGrow: 1 }}>
        {typeof mainElement === 'string' ? (
          <Text>{mainElement}</Text>
        ) : (
          mainElement
        )}
      </Box>
      {rightElement != null && (
        <Flex flexShrink={0} ml={2}>
          {rightElement}
        </Flex>
      )}
    </Flex>
  );
}
