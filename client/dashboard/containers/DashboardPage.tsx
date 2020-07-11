// FIXME: Use layout components instead of using rebass directly
import React from 'react';

import { List } from '../../shared/components/List';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { EmptyProps } from '../../viewModels/EmptyProps';
import { CategoryCountListItem } from '../components/CategoryCountListItem';
import { CheckpointCountListItem } from '../components/CheckpointCountListItem';
import { TagCountListItem } from '../components/TagCountListItem';
import { TodoCountListItem } from '../components/TodoCountListItem';
import { useDashboardPageState } from '../hooks/useDashboardPageState';

export const DashboardPage: React.FunctionComponent<EmptyProps> = () => {
  const {
    categoryCount,
    checkpointCount,
    isLoading,
    tagCount,
    todoCount,
  } = useDashboardPageState();

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
