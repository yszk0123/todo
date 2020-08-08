import React from 'react';

import { EmptyProps } from '../../view_models/EmptyProps';
import { Page } from '../components/Page';
import { usePageContainerQuery } from '../graphql/__generated__/PageContainer.graphql';

export const PageContainer: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  const { data, loading: isQueryLoading } = usePageContainerQuery();
  const isLoading = !data && isQueryLoading;

  const hasSession = !!data?.me;
  const username = data?.me?.name ?? null;
  const avatarUrl = data?.me?.image ?? null;

  return (
    <Page
      avatarUrl={avatarUrl}
      content={children}
      hasSession={hasSession}
      isLoading={isLoading}
      username={username}
    />
  );
};
