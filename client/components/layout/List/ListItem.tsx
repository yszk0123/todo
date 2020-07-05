import React from 'react';
import { Box, Flex, Text } from 'rebass';

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
  leftElement?: JSX.Element | null;
  mainElement: JSX.Element | string;
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleClick = React.useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Flex
      alignItems="center"
      bg={isActive ? 'muted' : undefined}
      flex="1 1 auto"
      p={2}
      sx={{
        cursor: 'pointer',
        borderBottom: '1px dotted',
        borderColor: 'gray',
        ':last-child': { borderBottom: 'none' },
      }}
      variant="listItem"
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
