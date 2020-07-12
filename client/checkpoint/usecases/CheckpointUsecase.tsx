import { ApolloClient } from '@apollo/client';

import { toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import {
  CheckpointEditFormAction,
  checkpointEditFormReset,
  checkpointEditFormSet,
  CheckpointEditFormState,
} from '../ducks/CheckpointEditFormStateDucks';
import {
  CreateOneCheckpointDocument,
  CreateOneCheckpointMutationVariables,
  DeleteCheckpointsByIdDocument,
  DeleteCheckpointsByIdMutationVariables,
  DeleteOneCheckpointDocument,
  DeleteOneCheckpointMutationVariables,
  refetchGetCheckpointQuery,
  UpdateCheckpointsByIdDocument,
  UpdateCheckpointsByIdMutationVariables,
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

  async updateCheckpointsById({
    endAt,
    name,
    selectedCheckpointIds,
  }: CheckpointEditFormState) {
    this.dispatch(checkpointEditFormSet({ selectedCheckpointIds: [] }));

    await this.client.mutate<unknown, UpdateCheckpointsByIdMutationVariables>({
      mutation: UpdateCheckpointsByIdDocument,
      variables: {
        input: {
          ids: selectedCheckpointIds,
          name: name !== '' ? name : undefined,
          endAt: endAt ?? undefined,
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

  async deleteCheckpointsById(checkpointIds: ID[]) {
    const count = checkpointIds.length;
    if (!confirm(`Delete ${count} items?`)) return;

    this.dispatch(checkpointEditFormReset());

    await this.client.mutate<unknown, DeleteCheckpointsByIdMutationVariables>({
      mutation: DeleteCheckpointsByIdDocument,
      variables: { data: { ids: checkpointIds } },
      refetchQueries: [refetchGetCheckpointQuery()],
    });
  }

  async archiveCheckpointsById(checkpointIds: ID[]) {
    await this.client.mutate<unknown, UpdateCheckpointsByIdMutationVariables>({
      mutation: UpdateCheckpointsByIdDocument,
      variables: {
        input: {
          ids: checkpointIds,
          archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [refetchGetCheckpointQuery()],
    });
  }
}
