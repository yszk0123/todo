import React from 'react';

import { List } from '../../shared/components/List';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import {
  VerticalStack,
  VerticalStackItem,
  VerticalStackMainItem,
} from '../../shared/components/VerticalStack';
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

  return (
    <PageContent>
      <VerticalStack>
        <VerticalStackItem>
          <List>
            <CategoryCountListItem count={categoryCount} />
            <CheckpointCountListItem count={checkpointCount} />
            <TodoCountListItem count={todoCount} />
            <TagCountListItem count={tagCount} />
          </List>
        </VerticalStackItem>
        <VerticalStackMainItem>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <TodoCountByDateChart data={todoCountByDate} />
          )}
        </VerticalStackMainItem>
      </VerticalStack>
    </PageContent>
  );
};
