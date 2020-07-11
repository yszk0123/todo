import { useDashboardPageQuery } from '../graphql/__generated__/DashboardPage.graphql';

export function useDashboardPageState() {
  const { data, loading } = useDashboardPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  return {
    categoryCount: data?.stats?.categoryCount ?? null,
    tagCount: data?.stats?.tagCount ?? null,
    todoCount: data?.stats?.todoCount ?? null,
    checkpointCount: data?.stats?.checkpointCount ?? null,
    isLoading: !data && loading,
  };
}
