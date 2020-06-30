import React from 'react';
import { Flex, Text, Box } from 'rebass';
import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';

export const TagListItem: React.FunctionComponent<{
  isActive: boolean;
  tag: RootTagFragment;
  onClick: (tag: RootTagFragment) => void;
}> = ({ isActive, tag, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(tag);
  }, [tag, onClick]);

  return (
    <Flex alignItems="center" p={2} sx={{ cursor: 'pointer' }}>
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
