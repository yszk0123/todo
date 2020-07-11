import { ApolloClient } from '@apollo/client';

import { ID } from '../../viewModels/ID';
import {
  CategoryEditFormAction,
  categoryEditFormReset,
  categoryEditFormSet,
  CategoryEditFormState,
} from '../ducks/CategoryEditFormDucks';
import {
  CreateOneCategoryDocument,
  CreateOneCategoryMutationVariables,
  DeleteOneCategoryDocument,
  DeleteOneCategoryMutationVariables,
  refetchGetCategoriesQuery,
  UpdateOneCategoryDocument,
  UpdateOneCategoryMutationVariables,
} from '../graphql/__generated__/Category.graphql';

export class CategoryUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: CategoryEditFormAction) => void
  ) {}

  async createOneCategory(
    userId: string,
    categoryEditFormState: CategoryEditFormState
  ) {
    const { name } = categoryEditFormState;

    this.dispatch(categoryEditFormSet({ name: '' }));

    await this.client.mutate<unknown, CreateOneCategoryMutationVariables>({
      mutation: CreateOneCategoryDocument,
      variables: {
        data: {
          owner: { connect: { id: userId } },
          name,
        },
      },
      refetchQueries: [refetchGetCategoriesQuery()],
    });
  }

  async updateOneCategory({
    name,
    selectedCategoryIds,
  }: CategoryEditFormState) {
    const count = selectedCategoryIds.length;
    if (count !== 1) return;
    const selectedCategoryId = selectedCategoryIds[0];

    this.dispatch(categoryEditFormSet({ selectedCategoryIds: [] }));

    await this.client.mutate<unknown, UpdateOneCategoryMutationVariables>({
      mutation: UpdateOneCategoryDocument,
      variables: {
        where: {
          id: selectedCategoryId,
        },
        data: {
          name: count === 1 ? name : undefined,
        },
      },
    });
  }

  async deleteOneCategory(categoryIds: ID[]) {
    const count = categoryIds.length;
    if (count !== 1) return;
    if (!confirm(`Delete ${count} items?`)) return;
    const categoryId = categoryIds[0];

    this.dispatch(categoryEditFormReset());

    await this.client.mutate<unknown, DeleteOneCategoryMutationVariables>({
      mutation: DeleteOneCategoryDocument,
      variables: { where: { id: categoryId } },
      refetchQueries: [refetchGetCategoriesQuery()],
    });
  }

  async archiveOneCategory(categoryIds: ID[]) {
    if (categoryIds.length !== 1) return;
    const categoryId = categoryIds[0];

    await this.client.mutate<unknown, UpdateOneCategoryMutationVariables>({
      mutation: UpdateOneCategoryDocument,
      variables: {
        where: {
          id: categoryId,
        },
        data: {
          // FIXME: Implement
          // archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [refetchGetCategoriesQuery()],
    });
  }
}
