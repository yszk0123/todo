import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';

import { CheckpointUsecase } from './CheckpointUsecase';

export function useCheckpointUsecase(): CheckpointUsecase {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [checkpointUsecase] = React.useState(
    () => new CheckpointUsecase(client, dispatch)
  );
  return checkpointUsecase;
}
