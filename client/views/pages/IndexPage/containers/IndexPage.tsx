// FIXME: Use layout components instead of using rebass directly
import React from 'react';

import { EmptyProps } from '../../../../viewModels/EmptyProps';
import { List } from '../../../components/List';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { PageContent } from '../../../components/PageContent';
import { CategoryCountListItem } from '../components/CategoryCountListItem';
import { CheckpointCountListItem } from '../components/CheckpointCountListItem';
import { TagCountListItem } from '../components/TagCountListItem';
import { TodoCountListItem } from '../components/TodoCountListItem';
import { useIndexPageState } from '../hooks/useIndexPageState';

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
