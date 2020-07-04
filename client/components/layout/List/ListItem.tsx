import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import { Flex, Box } from 'rebass';

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
  mainElement: JSX.Element;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleClick = React.useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Flex
      flex="1 1 auto"
      alignItems="center"
      p={2}
      bg={isActive ? 'highlight' : undefined}
      color={isActive ? 'highlightText' : undefined}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {leftElement != null && (
        <Flex flexShrink={0} mr={2}>
          {leftElement}
        </Flex>
      )}
      <Box sx={{ flexGrow: 1 }}>{mainElement}</Box>
      {rightElement != null && (
        <Flex ml={2} flexShrink={0}>
          {rightElement}
        </Flex>
      )}
    </Flex>
  );
}
