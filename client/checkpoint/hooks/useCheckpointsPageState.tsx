import React from 'react';

import { EMPTY } from '../../shared/constants/EMPTY';
import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { getSelectModeFromSelection } from '../../view_models/SelectMode';
import { useCheckpointsPageQuery } from '../graphql/__generated__/CheckpointsPage.graphql';

export function useCheckpointsPageState() {
  const { data, loading, refetch } = useCheckpointsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const checkpointEditFormValues = useTypedSelector(
    (state) => state.checkpointEditForm
  );
  const checkpointSelection = useTypedSelector(
    (state) => state.checkpointSelection
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
    checkpointEditFormValues,
    checkpointSelection,
    checkpoints: data?.checkpoints ?? EMPTY,
    isLoading: !data && loading,
    selectMode: getSelectModeFromSelection(checkpointSelection),
    userId: data?.me?.id,
  };
}
