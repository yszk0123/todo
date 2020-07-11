import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TodoUsecase } from './TodoUsecase';

export function useTodoUsecase(): TodoUsecase {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const [todoUsecase] = React.useState(() => new TodoUsecase(client, dispatch));
  return todoUsecase;
}
