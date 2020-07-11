import { useTodosReportPageQuery } from '../../../graphql/__generated__/TodosReportPage.graphql';
import { ID } from '../../../viewModels/ID';

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
