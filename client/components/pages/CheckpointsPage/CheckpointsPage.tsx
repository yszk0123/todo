import { useApolloClient } from '@apollo/client';
import React from 'react';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { RootCheckpointFragment } from '../../../graphql/__generated__/Checkpoint.graphql';
import { useCheckpointsPageQuery } from '../../../graphql/__generated__/CheckpointsPage.graphql';
import {
  checkpointEditFormInitialState,
  checkpointEditFormReducer,
  checkpointEditFormReset,
  checkpointEditFormSelectOne,
  checkpointEditFormSet,
} from '../../../state/CheckpointEditFormState';
import { CheckpointUsecase } from '../../../usecases/CheckpointUsecase';
import { DateTime } from '../../../viewModels/DateTime';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { CheckpointEditForm } from './CheckpointEditForm';
import { CheckpointList } from './CheckpointList';
import { CheckpointStatusBar } from './CheckpointStatusBar';

export const CheckpointsPage: React.FunctionComponent<EmptyProps> = () => {
  const { data, loading, refetch } = useCheckpointsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const client = useApolloClient();
  const [checkpointEditFormState, dispatch] = React.useReducer(
    checkpointEditFormReducer,
    checkpointEditFormInitialState
  );
  const [checkpointUsecase] = React.useState(
    () => new CheckpointUsecase(client, dispatch)
  );

  const userId = data?.me?.id;
  const count = checkpointEditFormState.selectedCheckpointIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;
  const [now, setNow] = React.useState(() => Date.now());

  const handleSelectOneCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment) => {
      dispatch(checkpointEditFormSelectOne(checkpoint));
    },
    []
  );

  const handleDeselectCheckpoint = React.useCallback(() => {
    dispatch(checkpointEditFormReset());
  }, []);

  const handleCreateOneCheckpoint = React.useCallback(async () => {
    if (!userId) return;
    await checkpointUsecase.createOneCheckpoint(
      userId,
      checkpointEditFormState
    );
    await refetch();
  }, [userId, checkpointUsecase, checkpointEditFormState, refetch]);

  const handleDeleteOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.deleteOneCheckpoint(
      checkpointEditFormState.selectedCheckpointIds
    );
    await refetch();
  }, [
    checkpointUsecase,
    checkpointEditFormState.selectedCheckpointIds,
    refetch,
  ]);

  const handleUpdateOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.updateOneCheckpoint(checkpointEditFormState);
  }, [checkpointUsecase, checkpointEditFormState]);

  const handleArchiveOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.archiveOneCheckpoint(
      checkpointEditFormState.selectedCheckpointIds
    );
    await refetch();
  }, [
    checkpointUsecase,
    checkpointEditFormState.selectedCheckpointIds,
    refetch,
  ]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      dispatch(checkpointEditFormSet({ name }));
    },
    []
  );

  const handleChangeEndAt = React.useCallback((endAt: DateTime | null) => {
    dispatch(checkpointEditFormSet({ endAt }));
  }, []);

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const { endAt, name, selectedCheckpointIds } = checkpointEditFormState;
  const checkpoints = data.checkpoints ?? [];
  const currentCheckpointId = selectedCheckpointIds[0] ?? null;
  const isSelected = selectMode === SelectMode.SINGLE;

  return (
    <PageContent onClick={handleDeselectCheckpoint}>
      <CheckpointStatusBar count={checkpoints.length} />
      <CheckpointList
        checkpoints={checkpoints}
        currentCheckpointId={currentCheckpointId}
        now={now}
        onClick={handleSelectOneCheckpoint}
      />
      <CheckpointEditForm
        endAt={endAt}
        isSelected={isSelected}
        name={name}
        onArchiveOneCheckpoint={handleArchiveOneCheckpoint}
        onChangeEndAt={handleChangeEndAt}
        onChangeName={handleChangeName}
        onCreateOneCheckpoint={handleCreateOneCheckpoint}
        onDeleteOneCheckpoint={handleDeleteOneCheckpoint}
        onUpdateOneCheckpoint={handleUpdateOneCheckpoint}
      />
    </PageContent>
  );
};
