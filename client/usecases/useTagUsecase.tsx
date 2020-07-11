import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TagUsecase } from './TagUsecase';

export function useTagUsecase(): TagUsecase {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [tagUsecase] = React.useState(() => new TagUsecase(client, dispatch));
  return tagUsecase;
}
