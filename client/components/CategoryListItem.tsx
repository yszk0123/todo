import React from 'react';
import NextLink from 'next/link';
import { Link, Flex, Text, Box } from 'rebass';
import { CategoryVM } from '../viewModels/CategoryVM';

const CategoryGoToTodoLink: React.FunctionComponent<{
  categoryId: number;
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
  category: CategoryVM;
  onClick: (category: CategoryVM) => void;
}> = ({ isActive, category, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(category);
  }, [category, onClick]);

  return (
    <Flex alignItems="center" p={2}>
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
