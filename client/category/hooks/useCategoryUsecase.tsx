import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';

import { CategoryUsecase } from '../usecases/CategoryUsecase';

export function useCategoryUsecase(): CategoryUsecase {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [categoryUsecase] = React.useState(
    () => new CategoryUsecase(client, dispatch)
  );
  return categoryUsecase;
}
