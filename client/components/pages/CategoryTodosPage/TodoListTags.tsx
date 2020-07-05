// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import { Flex, Box } from 'rebass';
import { ColorBadge } from '../../layout/ColorBadge';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';

export const TodoListTags: React.FunctionComponent<{
  tags: CategoryTagFragment[];
}> = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <Flex justifyContent="flex-end">
      {tags.map((tag, i) => (
        <Box display="inline-block" key={tag.id} ml={i === 0 ? 0 : 1}>
          <ColorBadge color={tag.color} key={tag.id} text={tag.name} />
        </Box>
      ))}
    </Flex>
  );
};
