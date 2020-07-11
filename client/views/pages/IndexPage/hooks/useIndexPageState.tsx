import { useIndexPageQuery } from '../../../../graphql/__generated__/IndexPage.graphql';

export function useIndexPageState() {
  const { data, loading } = useIndexPageQuery({
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
