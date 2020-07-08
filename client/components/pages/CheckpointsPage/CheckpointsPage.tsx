import React from 'react';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { CheckpointCreateInput } from '../../../graphql/__generated__/baseTypes';
import {
  useCheckpointsPageQuery,
  useCreateOneCheckpointMutation,
  useDeleteOneCheckpointMutation,
  useUpdateOneCheckpointMutation,
} from '../../../graphql/__generated__/CheckpointsPage.graphql';
import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { DateTime, toDateTime } from '../../../viewModels/DateTime';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { ID } from '../../../viewModels/ID';
import isDocumentVisible from '../../helpers/isDocumentVisible';
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
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneCheckpoint] = useCreateOneCheckpointMutation({
    onCompleted: handleCompleted,
  });
  const [deleteOneCheckpoint] = useDeleteOneCheckpointMutation({
    onCompleted: handleCompleted,
  });
  const [updateOneCheckpoint] = useUpdateOneCheckpointMutation({
    onCompleted: handleCompleted,
  });
  const [name, setName] = React.useState<string | null>(null);
  const [endAt, setEndAt] = React.useState<DateTime | null>(null);
  const [
    currentCheckpointId,
    setCurrentCheckpointId,
  ] = React.useState<ID | null>(null);
  const isSelected = !!currentCheckpointId;
  const [now, setNow] = React.useState(() => Date.now());

  const deselect = React.useCallback(() => {
    setCurrentCheckpointId(null);
    setName('');
    setEndAt(null);
  }, []);

  const handleSelectCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment) => {
      if (checkpoint.id !== currentCheckpointId) {
        setCurrentCheckpointId(checkpoint.id);
        setName(checkpoint.name ?? null);
        setEndAt(checkpoint.endAt);
      } else {
        deselect();
      }
    },
    [currentCheckpointId, deselect]
  );

  const handleDeselectCheckpoint = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneCheckpoint = React.useCallback(() => {
    if (data?.me) {
      const newData: CheckpointCreateInput = {
        owner: { connect: { id: data.me.id } },
        name,
        endAt: toDateTime(endAt ?? new Date()),
      };
      deselect();
      createOneCheckpoint({ variables: { data: newData } });
    }
  }, [data?.me, name, endAt, deselect, createOneCheckpoint]);

  const handleDeleteOneCheckpoint = React.useCallback(() => {
    if (!currentCheckpointId) return;
    if (!confirm('Delete?')) return;
    deselect();
    deleteOneCheckpoint({ variables: { where: { id: currentCheckpointId } } });
  }, [deselect, deleteOneCheckpoint, currentCheckpointId]);

  const handleUpdateOneCheckpoint = React.useCallback(() => {
    if (!currentCheckpointId) return;
    updateOneCheckpoint({
      variables: {
        data: { name, endAt: toDateTime(endAt ?? new Date()) },
        where: { id: currentCheckpointId },
      },
    });
  }, [currentCheckpointId, updateOneCheckpoint, name, endAt]);

  const handleArchiveOneCheckpoint = React.useCallback(() => {
    if (!currentCheckpointId) return;
    const archivedAt = toDateTime(new Date());
    updateOneCheckpoint({
      variables: { data: { archivedAt }, where: { id: currentCheckpointId } },
    });
  }, [updateOneCheckpoint, currentCheckpointId]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      setName(name);
    },
    []
  );

  const handleChangeEndAt = React.useCallback((endAt: DateTime | null) => {
    setEndAt(endAt);
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

  const checkpoints = data.checkpoints ?? [];

  return (
    <PageContent onClick={handleDeselectCheckpoint}>
      <CheckpointStatusBar count={checkpoints.length} />
      <CheckpointList
        checkpoints={checkpoints}
        currentCheckpointId={currentCheckpointId}
        now={now}
        onClick={handleSelectCheckpoint}
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
