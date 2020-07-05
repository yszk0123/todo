// FIXME: Use layout components instead of using rebass directly
import React from 'react';

import { useIndexPageQuery } from '../../../graphql/__generated__/IndexPage.graphql';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { List, ListItem, ListText } from '../../layout/List';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';

export const IndexPage: React.FunctionComponent<EmptyProps> = () => {
  const { data, loading } = useIndexPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const categoryCount = data.stats?.categoryCount ?? null;
  const tagCount = data.stats?.tagCount ?? null;
  const todoCount = data.stats?.todoCount ?? null;
  const checkpointCount = data.stats?.checkpointCount ?? null;

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

function CategoryCountListItem({
  count,
}: {
  count: number | null;
}): JSX.Element | null {
  if (count === null) {
    return null;
  }

  return (
    <ListItem
      item={null}
      mainElement={<ListText>{`${count} categories`}</ListText>}
    />
  );
}

function TagCountListItem({
  count,
}: {
  count: number | null;
}): JSX.Element | null {
  if (count === null) {
    return null;
  }

  return (
    <ListItem
      item={null}
      mainElement={<ListText>{`${count} tags`}</ListText>}
    />
  );
}

function TodoCountListItem({
  count,
}: {
  count: number | null;
}): JSX.Element | null {
  if (count === null) {
    return null;
  }

  return (
    <ListItem
      item={null}
      mainElement={<ListText>{`${count} todos`}</ListText>}
    />
  );
}

function CheckpointCountListItem({
  count,
}: {
  count: number | null;
}): JSX.Element | null {
  if (count === null) {
    return null;
  }

  return (
    <ListItem
      item={null}
      mainElement={<ListText>{`${count} checkpoints`}</ListText>}
    />
  );
}
