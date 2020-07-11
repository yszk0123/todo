import { ApolloClient } from '@apollo/client';

import { toDateTime } from '../../viewModels/DateTime';
import { ID } from '../../viewModels/ID';
import {
  CheckpointEditFormAction,
  checkpointEditFormReset,
  checkpointEditFormSet,
  CheckpointEditFormState,
} from '../ducks/CheckpointEditFormStateDucks';
import {
  CreateOneCheckpointDocument,
  CreateOneCheckpointMutationVariables,
  DeleteOneCheckpointDocument,
  DeleteOneCheckpointMutationVariables,
  refetchGetCheckpointQuery,
  UpdateOneCheckpointDocument,
  UpdateOneCheckpointMutationVariables,
} from '../graphql/__generated__/Checkpoint.graphql';

export class CheckpointUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: CheckpointEditFormAction) => void
  ) {}

  async createOneCheckpoint(
    userId: string,
    checkpointEditFormState: CheckpointEditFormState
  ) {
    const { endAt, name } = checkpointEditFormState;
    if (endAt === null) {
      alert('endAt is required');
      return;
    }

    this.dispatch(checkpointEditFormSet({ name: '' }));

    await this.client.mutate<unknown, CreateOneCheckpointMutationVariables>({
      mutation: CreateOneCheckpointDocument,
      variables: {
        data: {
          owner: { connect: { id: userId } },
          name,
          endAt: endAt ?? null,
        },
      },
      refetchQueries: [refetchGetCheckpointQuery()],
    });
  }

  async updateOneCheckpoint({
    endAt,
    name,
    selectedCheckpointIds,
  }: CheckpointEditFormState) {
    const count = selectedCheckpointIds.length;
    if (count !== 1) return;
    const selectedCheckpointId = selectedCheckpointIds[0];

    this.dispatch(checkpointEditFormSet({ selectedCheckpointIds: [] }));

    await this.client.mutate<unknown, UpdateOneCheckpointMutationVariables>({
      mutation: UpdateOneCheckpointDocument,
      variables: {
        where: {
          id: selectedCheckpointId,
        },
        data: {
          name: count === 1 ? name : undefined,
          endAt: endAt ? endAt : undefined,
        },
      },
    });
  }

  async deleteOneCheckpoint(checkpointIds: ID[]) {
    const count = checkpointIds.length;
    if (count !== 1) return;
    if (!confirm(`Delete ${count} items?`)) return;
    const checkpointId = checkpointIds[0];

    this.dispatch(checkpointEditFormReset());

    await this.client.mutate<unknown, DeleteOneCheckpointMutationVariables>({
      mutation: DeleteOneCheckpointDocument,
      variables: { where: { id: checkpointId } },
      refetchQueries: [refetchGetCheckpointQuery()],
    });
  }

  async archiveOneCheckpoint(checkpointIds: ID[]) {
    if (checkpointIds.length !== 1) return;
    const checkpointId = checkpointIds[0];

    await this.client.mutate<unknown, UpdateOneCheckpointMutationVariables>({
      mutation: UpdateOneCheckpointDocument,
      variables: {
        where: {
          id: checkpointId,
        },
        data: {
          archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [refetchGetCheckpointQuery()],
    });
  }
}
