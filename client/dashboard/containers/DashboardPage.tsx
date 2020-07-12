// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import { Flex } from 'rebass';

import { List } from '../../shared/components/List';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CategoryCountListItem } from '../components/CategoryCountListItem';
import { CheckpointCountListItem } from '../components/CheckpointCountListItem';
import { TagCountListItem } from '../components/TagCountListItem';
import { TodoCountByDateChart } from '../components/TodoCountByDateChart';
import { TodoCountListItem } from '../components/TodoCountListItem';
import { useDashboardPageState } from '../hooks/useDashboardPageState';

export const DashboardPage: React.FunctionComponent<EmptyProps> = () => {
  const {
    categoryCount,
    checkpointCount,
    isLoading,
    tagCount,
    todoCount,
    todoCountByDate,
  } = useDashboardPageState();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent>
      <Flex flexDirection="column" height="100%">
        <Flex flexShrink={0} width={1}>
          <List>
            <CategoryCountListItem count={categoryCount} />
            <TodoCountListItem count={todoCount} />
            <CheckpointCountListItem count={checkpointCount} />
            <TagCountListItem count={tagCount} />
          </List>
        </Flex>
        <Flex flexGrow={1}>
          <TodoCountByDateChart data={todoCountByDate} />
        </Flex>
      </Flex>
    </PageContent>
  );
};
