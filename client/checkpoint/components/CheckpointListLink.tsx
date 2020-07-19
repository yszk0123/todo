import React from 'react';

import { ListIconLink } from '../../shared/components/List';
import { fromTodoSearchFormValues } from '../../todo/view_models/TodoSearchQuery';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';

type Props = {
  checkpoint: RootCheckpointFragment;
};

export const CheckpointListLink: React.FunctionComponent<Props> = ({
  checkpoint,
}) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ checkpoint }),
    [checkpoint]
  );

  return <ListIconLink href={{ pathname: '/todos', query: todoSearchQuery }} />;
};
