// FIXME: Use layout components instead of using rebass directly
import React from 'react';

import { EmptyProps } from '../../../viewModels/EmptyProps';
import { List, ListItem, ListText } from '../../layout/List';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
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
