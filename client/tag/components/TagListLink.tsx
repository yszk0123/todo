import React from 'react';

import { ListIconLink } from '../../shared/components/List';
import { fromTodoSearchFormValues } from '../../todo/view_models/TodoSearchQuery';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';

type Props = {
  tag: RootTagFragment;
};

export const TagListLink: React.FunctionComponent<Props> = ({ tag }) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ tags: [tag] }),
    [tag]
  );

  return <ListIconLink href={{ pathname: '/todos', query: todoSearchQuery }} />;
};
