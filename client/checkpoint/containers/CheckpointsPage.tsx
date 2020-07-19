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
import { getSelectedIds, Selection } from '../../view_models/Selection';
import { CheckpointEditForm } from '../components/CheckpointEditForm';
import { CheckpointList } from '../components/CheckpointList';
import { CheckpointStatusBar } from '../components/CheckpointStatusBar';
import {
  checkpointEditFormOpen,
  checkpointEditFormSet,
} from '../ducks/CheckpointEditFormDucks';
import {
  checkpointSelectionDeselect,
  checkpointSelectionSelectMany,
} from '../ducks/CheckpointSelectionDucks';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { useCheckpointsPageState } from '../hooks/useCheckpointsPageState';
import { useCheckpointUsecase } from '../hooks/useCheckpointUsecase';

export const CheckpointsPage: React.FunctionComponent<EmptyProps> = () => {
  const dispatch = useDispatch();
  const checkpointUsecase = useCheckpointUsecase();
  const {
    checkpointEditFormValues,
    checkpointSelection,
    checkpoints,
    isLoading,
    now,
    selectMode,
    userId,
  } = useCheckpointsPageState();
  const { modalType, onCloseModal, onOpenEdit } = useModalType(
    checkpoints,
    checkpointSelection
  );
  const selectedCheckpointIds = getSelectedIds(checkpointSelection);

  const handleSelectManyCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment) => {
      dispatch(checkpointSelectionSelectMany(checkpoint));
    },
    [dispatch]
  );

  const handleDeselectCheckpoint = React.useCallback(() => {
    dispatch(checkpointSelectionDeselect());
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
    checkpointUsecase.createOneCheckpoint(userId, checkpointEditFormValues);
  }, [userId, checkpointUsecase, checkpointEditFormValues]);

  const handleDeleteCheckpointsById = React.useCallback(() => {
    checkpointUsecase.deleteCheckpointsById(selectedCheckpointIds);
  }, [checkpointUsecase, selectedCheckpointIds]);

  const handleUpdateCheckpointsById = React.useCallback(() => {
    checkpointUsecase.updateCheckpointsById(
      checkpointEditFormValues,
      selectedCheckpointIds
    );
  }, [checkpointUsecase, checkpointEditFormValues, selectedCheckpointIds]);

  const handleArchiveOneCheckpoint = React.useCallback(() => {
    checkpointUsecase.archiveCheckpointsById(selectedCheckpointIds);
  }, [checkpointUsecase, selectedCheckpointIds]);

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
        selectedCheckpointIds={selectedCheckpointIds}
        onClick={handleSelectManyCheckpoint}
        onClickCheckbox={handleSelectManyCheckpoint}
      />
      <CheckpointEditForm
        checkpointEditFormValues={checkpointEditFormValues}
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

function useModalType(
  checkpoints: RootCheckpointFragment[],
  checkpointSelection: Selection
) {
  const [modalType, setModalType] = React.useState(ModalType.NONE);
  const dispatch = useDispatch();

  const onCloseModal = React.useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  const onOpenEdit = React.useCallback(() => {
    dispatch(checkpointEditFormOpen(checkpoints, checkpointSelection));
    setModalType(ModalType.EDIT);
  }, [checkpointSelection, checkpoints, dispatch]);

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
