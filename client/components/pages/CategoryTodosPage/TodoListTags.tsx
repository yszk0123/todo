import React from 'react';
import { Flex, Box } from 'rebass';
import { Badge } from './Badge';
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
        <Box key={tag.id} display="inline-block" ml={i === 0 ? 0 : 1}>
          <Badge key={tag.id} color={tag.color} text={tag.name} />
        </Box>
      ))}
    </Flex>
  );
};
