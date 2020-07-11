import React from 'react';
import { useDispatch } from 'react-redux';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { DateTime } from '../../viewModels/DateTime';
import { EmptyProps } from '../../viewModels/EmptyProps';
import { CheckpointEditForm } from '../components/CheckpointEditForm';
import { CheckpointList } from '../components/CheckpointList';
import { CheckpointStatusBar } from '../components/CheckpointStatusBar';
import {
  checkpointEditFormReset,
  checkpointEditFormSelectOne,
  checkpointEditFormSet,
} from '../ducks/CheckpointEditFormStateDucks';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { useCheckpointsPageState } from '../hooks/useCheckpointsPageState';
import { useCheckpointUsecase } from '../hooks/useCheckpointUsecase';

export const CheckpointsPage: React.FunctionComponent<EmptyProps> = () => {
  const dispatch = useDispatch();
  const checkpointUsecase = useCheckpointUsecase();
  const {
    checkpointEditFormState,
    checkpoints,
    currentCheckpointId,
    isLoading,
    isSelected,
    now,
    userId,
  } = useCheckpointsPageState();

  const handleSelectOneCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment) => {
      dispatch(checkpointEditFormSelectOne(checkpoint));
    },
    [dispatch]
  );

  const handleDeselectCheckpoint = React.useCallback(() => {
    dispatch(checkpointEditFormReset());
  }, [dispatch]);

  const handleCreateOneCheckpoint = React.useCallback(async () => {
    if (!userId) return;
    await checkpointUsecase.createOneCheckpoint(
      userId,
      checkpointEditFormState
    );
  }, [userId, checkpointUsecase, checkpointEditFormState]);

  const handleDeleteOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.deleteOneCheckpoint(
      checkpointEditFormState.selectedCheckpointIds
    );
  }, [checkpointUsecase, checkpointEditFormState.selectedCheckpointIds]);

  const handleUpdateOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.updateOneCheckpoint(checkpointEditFormState);
  }, [checkpointUsecase, checkpointEditFormState]);

  const handleArchiveOneCheckpoint = React.useCallback(async () => {
    await checkpointUsecase.archiveOneCheckpoint(
      checkpointEditFormState.selectedCheckpointIds
    );
  }, [checkpointUsecase, checkpointEditFormState.selectedCheckpointIds]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      dispatch(checkpointEditFormSet({ name }));
    },
    [dispatch]
  );

  const handleChangeEndAt = React.useCallback(
    (endAt: DateTime | null) => {
      dispatch(checkpointEditFormSet({ endAt }));
    },
    [dispatch]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
        checkpointEditFormState={checkpointEditFormState}
        isSelected={isSelected}
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
