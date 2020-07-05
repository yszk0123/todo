import React from 'react';
import { useSession } from 'next-auth/client';
import { useIndexPageQuery } from '../../graphql/__generated__/IndexPage.graphql';
import { Page } from '../layout/Page';
import { EmptyProps } from '../../viewModels/EmptyProps';

export const PageContainer: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  const [session, isSessionLoading] = useSession();
  const { loading: isQueryLoading, data } = useIndexPageQuery();
  const hasSession = !!session;
  const isLoading = isSessionLoading || isQueryLoading;

  const username = data?.me?.name ?? null;
  const avatarUrl = data?.me?.avatarUrl ?? null;

  return (
    <Page
      hasSession={hasSession}
      username={username}
      avatarUrl={avatarUrl}
      isLoading={isLoading}
      content={children}
    />
  );
};
