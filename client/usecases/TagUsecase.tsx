import { ApolloClient } from '@apollo/client';

import {
  CreateOneTagDocument,
  CreateOneTagMutationVariables,
  DeleteOneTagDocument,
  DeleteOneTagMutationVariables,
  refetchGetTagsQuery,
  UpdateOneTagDocument,
  UpdateOneTagMutationVariables,
} from '../graphql/__generated__/Tag.graphql';
import {
  TagEditFormAction,
  tagEditFormReset,
  tagEditFormSet,
  TagEditFormState,
} from '../state/TagEditFormState';
import { ID } from '../viewModels/ID';

export class TagUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: TagEditFormAction) => void
  ) {}

  async createOneTag(userId: string, tagEditFormState: TagEditFormState) {
    const { color, name, tagCategories } = tagEditFormState;

    this.dispatch(tagEditFormSet({ name: '' }));

    await this.client.mutate<unknown, CreateOneTagMutationVariables>({
      mutation: CreateOneTagDocument,
      variables: {
        data: {
          owner: { connect: { id: userId } },
          name,
          color: color ?? null,
          categories: { connect: tagCategories.map((c) => ({ id: c.id })) },
        },
      },
      refetchQueries: [refetchGetTagsQuery()],
    });
  }

  async updateOneTag({
    color,
    name,
    selectedTagIds,
    tagCategories,
  }: TagEditFormState) {
    const count = selectedTagIds.length;
    if (count !== 1) return;
    const selectedTagId = selectedTagIds[0];

    this.dispatch(tagEditFormSet({ selectedTagIds: [] }));

    await this.client.mutate<unknown, UpdateOneTagMutationVariables>({
      mutation: UpdateOneTagDocument,
      variables: {
        where: {
          id: selectedTagId,
        },
        data: {
          name: count === 1 ? name : undefined,
          color: color ? color : undefined,
          categories: { connect: tagCategories.map((c) => ({ id: c.id })) },
        },
      },
    });
  }

  async deleteOneTag(tagIds: ID[]) {
    const count = tagIds.length;
    if (count !== 1) return;
    if (!confirm(`Delete ${count} items?`)) return;
    const tagId = tagIds[0];

    this.dispatch(tagEditFormReset());

    await this.client.mutate<unknown, DeleteOneTagMutationVariables>({
      mutation: DeleteOneTagDocument,
      variables: { where: { id: tagId } },
      refetchQueries: [refetchGetTagsQuery()],
    });
  }

  async archiveOneTag(tagIds: ID[]) {
    if (tagIds.length !== 1) return;
    const tagId = tagIds[0];

    await this.client.mutate<unknown, UpdateOneTagMutationVariables>({
      mutation: UpdateOneTagDocument,
      variables: {
        where: {
          id: tagId,
        },
        data: {
          // FIXME: Implement
          // archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [refetchGetTagsQuery()],
    });
  }
}
