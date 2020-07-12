import React from 'react';

import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { getSelectMode } from '../../view_models/SelectMode';
import { useCheckpointsPageQuery } from '../graphql/__generated__/CheckpointsPage.graphql';

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

  return {
    now,
    checkpointEditFormState,
    checkpoints: data?.checkpoints ?? [],
    isLoading: !data && loading,
    selectMode: getSelectMode(checkpointEditFormState.selectedCheckpointIds),
    userId: data?.me?.id,
  };
}
