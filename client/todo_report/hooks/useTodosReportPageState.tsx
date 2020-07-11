import { ID } from '../../viewModels/ID';
import { useTodosReportPageQuery } from '../graphql/__generated__/TodosReportPage.graphql';

export function useTodosReportPageState(categoryId: ID) {
  const { data, loading } = useTodosReportPageQuery({
    variables: { categoryId, categoryUUID: categoryId },
  });
  return {
    isLoading: !data && loading,
    todos: data?.todos ?? [],
    tags: data?.tags ?? [],
  };
}
