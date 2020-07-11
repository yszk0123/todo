import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';

export function getDisplayNameFromCategory(
  category: RootCategoryFragment
): string {
  return category.name ?? '';
}
