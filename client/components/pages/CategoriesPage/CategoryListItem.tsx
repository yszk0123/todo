import React from 'react';
import NextLink from 'next/link';
import { Link } from 'rebass';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ID } from '../../../viewModels/ID';
import { ListItem } from '../../layout/List';

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
  return (
    <ListItem
      isActive={isActive}
      item={category}
      onClick={onClick}
      leftElement={<CategoryGoToTodoLink categoryId={category.id} />}
      mainElement={category.name}
    />
  );
};
