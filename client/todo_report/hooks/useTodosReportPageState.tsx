import { EMPTY } from '../../shared/constants/EMPTY';
import { ID } from '../../view_models/ID';
import { useTodosReportPageQuery } from '../graphql/__generated__/TodosReportPage.graphql';

export function useTodosReportPageState(categoryId: ID) {
  const { data, loading } = useTodosReportPageQuery({
    variables: { categoryId },
  });
  return {
    isLoading: !data && loading,
    todos: data?.todos ?? EMPTY,
  };
}
