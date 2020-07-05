import React from 'react';
import { Flex, Box, Text } from 'rebass';

export function ListItem<T>({
  isActive,
  item,
  onClick,
  leftElement,
  mainElement,
  rightElement,
}: {
  isActive: boolean;
  item: T;
  onClick: (item: T) => void;
  leftElement?: JSX.Element | null;
  mainElement: JSX.Element | string;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleClick = React.useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Flex
      alignItems="center"
      bg={isActive ? 'highlight' : undefined}
      color={isActive ? 'highlightText' : undefined}
      flex="1 1 auto"
      p={2}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
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
