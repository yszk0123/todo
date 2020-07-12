import {
  TodoCountByDateFragment,
  useDashboardPageQuery,
} from '../graphql/__generated__/DashboardPage.graphql';

const EMPTY_TODO_COUNT_BY_DATE: TodoCountByDateFragment[] = [];

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
    todoCountByDate: data?.stats?.todoCountByDate ?? EMPTY_TODO_COUNT_BY_DATE,
  };
}
