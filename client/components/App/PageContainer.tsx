import { useSession } from 'next-auth/client';
import React from 'react';

import { useIndexPageQuery } from '../../graphql/__generated__/IndexPage.graphql';
import { EmptyProps } from '../../viewModels/EmptyProps';
import { Page } from '../layout/Page';

export const PageContainer: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  const [session, isSessionLoading] = useSession();
  const { data, loading: isQueryLoading } = useIndexPageQuery();
  const hasSession = !!session;
  const isLoading = isSessionLoading || isQueryLoading;

  const username = data?.me?.name ?? null;
  const avatarUrl = data?.me?.avatarUrl ?? null;

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
