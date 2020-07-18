import { EMPTY } from '../../shared/constants/EMPTY';
import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { getSelectMode } from '../../view_models/SelectMode';
import { useCategoriesPageQuery } from '../graphql/__generated__/CategoriesPage.graphql';

export function useCategoriesPageState() {
  const { data, loading, refetch } = useCategoriesPageQuery({
    fetchPolicy: 'cache-and-network',
  });
  const categoryEditFormState = useTypedSelector(
    (state) => state.categoryEditForm
  );

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
    }
  }, UPDATE_INTERVAL);

  return {
    categories: data?.categories ?? EMPTY,
    categoryEditFormState,
    currentCategoryId: categoryEditFormState.selectedCategoryIds[0] ?? null,
    isLoading: !data && loading,
    selectMode: getSelectMode(categoryEditFormState.selectedCategoryIds),
    userId: data?.me?.id,
  };
}
