import React from 'react';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { useCheckpointsPageQuery } from '../../../graphql/__generated__/CheckpointsPage.graphql';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';

export function useCheckpointsPageState() {
  const { data, loading, refetch } = useCheckpointsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const checkpointEditFormState = useTypedSelector(
    (state) => state.checkpointEditForm
  );

  const [now, setNow] = React.useState(() => Date.now());

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  const count = checkpointEditFormState.selectedCheckpointIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  return {
    now,
    selectMode,
    checkpointEditFormState,
    checkpoints: data?.checkpoints ?? [],
    currentCheckpointId:
      checkpointEditFormState.selectedCheckpointIds[0] ?? null,
    isLoading: !data && loading,
    isSelected: selectMode === SelectMode.SINGLE,
    userId: data?.me?.id,
  };
}
