import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';

export function getValueFromCategory(category: RootCategoryFragment): string {
  return category.id;
}
