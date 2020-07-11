// FIXME: Use layout components instead of using rebass directly
import React from 'react';

import { EmptyProps } from '../../../viewModels/EmptyProps';
import { List } from '../../layout/List';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { CategoryCountListItem } from './CategoryCountListItem';
import { CheckpointCountListItem } from './CheckpointCountListItem';
import { TagCountListItem } from './TagCountListItem';
import { TodoCountListItem } from './TodoCountListItem';
import { useIndexPageState } from './useIndexPageState';

export const IndexPage: React.FunctionComponent<EmptyProps> = () => {
  const {
    categoryCount,
    checkpointCount,
    isLoading,
    tagCount,
    todoCount,
  } = useIndexPageState();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent>
      <List>
        <CategoryCountListItem count={categoryCount} />
        <TodoCountListItem count={todoCount} />
        <CheckpointCountListItem count={checkpointCount} />
        <TagCountListItem count={tagCount} />
      </List>
    </PageContent>
  );
};
