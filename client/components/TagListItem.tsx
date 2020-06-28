import React from 'react';
import { Flex, Text, Box } from 'rebass';
import { TagVM } from '../viewModels/TagVM';

export const TagListItem: React.FunctionComponent<{
  isActive: boolean;
  tag: TagVM;
  onClick: (tag: TagVM) => void;
}> = ({ isActive, tag, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(tag);
  }, [tag, onClick]);

  return (
    <Flex alignItems="center" p={2}>
      <Box
        flex="1 1 auto"
        bg={isActive ? 'highlight' : undefined}
        onClick={handleClick}
      >
        <Text>{tag.name}</Text>
      </Box>
    </Flex>
  );
};
