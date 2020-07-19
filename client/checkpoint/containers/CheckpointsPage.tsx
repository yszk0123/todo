import React from 'react';
import { useDispatch } from 'react-redux';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { KeyCode } from '../../shared/constants/KeyCode';
import { useGlobalEscapeKey } from '../../shared/hooks/useGlobalEscapeKey';
import {
  Shortcut,
  useGlobalShortcut,
} from '../../shared/hooks/useGlobalShortcut';
import { DateTime } from '../../view_models/DateTime';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CheckpointEditForm } from '../components/CheckpointEditForm';
import { CheckpointList } from '../components/CheckpointList';
import { CheckpointStatusBar } from '../components/CheckpointStatusBar';
import {
  checkpointEditFormReset,
  checkpointEditFormSelectMany,
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
    isLoading,
    now,
    selectMode,
    userId,
  } = useCheckpointsPageState();
  const { modalType, onCloseModal, onOpenEdit } = useModalType();

  const handleSelectManyCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment) => {
      dispatch(checkpointEditFormSelectMany(checkpoint));
    },
    [dispatch]
  );

  const handleDeselectCheckpoint = React.useCallback(() => {
    dispatch(checkpointEditFormReset());
  }, [dispatch]);

  const handleSetName = React.useCallback(
    (name: string) => {
      dispatch(checkpointEditFormSet({ name }));
    },
    [dispatch]
  );

  const handleSetEndAt = React.useCallback(
    (endAt: DateTime | null) => {
      dispatch(checkpointEditFormSet({ endAt }));
    },
    [dispatch]
  );

  const handleCreateOneCheckpoint = React.useCallback(() => {
    if (!userId) return;
    checkpointUsecase.createOneCheckpoint(userId, checkpointEditFormState);
  }, [userId, checkpointUsecase, checkpointEditFormState]);

  const handleDeleteCheckpointsById = React.useCallback(() => {
    checkpointUsecase.deleteCheckpointsById(
      checkpointEditFormState.selectedCheckpointIds
    );
  }, [checkpointUsecase, checkpointEditFormState.selectedCheckpointIds]);

  const handleUpdateCheckpointsById = React.useCallback(() => {
    checkpointUsecase.updateCheckpointsById(checkpointEditFormState);
  }, [checkpointUsecase, checkpointEditFormState]);

  const handleArchiveOneCheckpoint = React.useCallback(() => {
    checkpointUsecase.archiveCheckpointsById(
      checkpointEditFormState.selectedCheckpointIds
    );
  }, [checkpointUsecase, checkpointEditFormState.selectedCheckpointIds]);

  const handleEscape =
    modalType === ModalType.NONE ? handleDeselectCheckpoint : onCloseModal;
  useGlobalEscapeKey(handleEscape);

  useGlobalShortcut((shortcut) => {
    const command = translateShortcut(shortcut);
    switch (command) {
      case Command.OPEN_EDIT: {
        onOpenEdit();
        break;
      }
    }
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent onClick={handleDeselectCheckpoint}>
      <CheckpointStatusBar
        count={checkpoints.length}
        selectMode={selectMode}
        onClickArchive={handleArchiveOneCheckpoint}
        onClickEdit={onOpenEdit}
      />
      <CheckpointList
        checkpoints={checkpoints}
        now={now}
        selectedCheckpointIds={checkpointEditFormState.selectedCheckpointIds}
        onClick={handleSelectManyCheckpoint}
        onClickCheckbox={handleSelectManyCheckpoint}
      />
      <CheckpointEditForm
        checkpointEditFormState={checkpointEditFormState}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        onChangeEndAt={handleSetEndAt}
        onChangeName={handleSetName}
        onCloseModal={onCloseModal}
        onCreateOneCheckpoint={handleCreateOneCheckpoint}
        onDeleteCheckpointsById={handleDeleteCheckpointsById}
        onUpdateCheckpointsById={handleUpdateCheckpointsById}
      />
    </PageContent>
  );
};

enum ModalType {
  NONE,
  EDIT,
}

function useModalType() {
  const [modalType, setModalType] = React.useState(ModalType.NONE);

  const onCloseModal = React.useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  const onOpenEdit = React.useCallback(() => {
    setModalType(ModalType.EDIT);
  }, []);

  return { onCloseModal, onOpenEdit, modalType };
}

enum Command {
  OPEN_EDIT,
  NONE,
}

function translateShortcut(shortcut: Shortcut): Command {
  switch (shortcut.code) {
    case KeyCode.E:
      return Command.OPEN_EDIT;
    default:
      return Command.NONE;
  }
}
