import React from 'react';
import NextLink from 'next/link';
import { Link, Flex, Text, Box } from 'rebass';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ID } from '../../../viewModels/ID';

const CategoryGoToTodoLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <NextLink
      href="/categories/[categoryId]/todos"
      as={`/categories/${categoryId}/todos`}
      passHref
    >
      <Link>Go</Link>
    </NextLink>
  );
};

export const CategoryListItem: React.FunctionComponent<{
  isActive: boolean;
  category: RootCategoryFragment;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ isActive, category, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <Flex alignItems="center" p={2} sx={{ cursor: 'pointer' }}>
      <Box
        flex="1 1 auto"
        bg={isActive ? 'highlight' : undefined}
        onClick={handleClick}
      >
        <CategoryGoToTodoLink categoryId={category.id} />
        <Text>{category.name}</Text>
      </Box>
    </Flex>
  );
};
