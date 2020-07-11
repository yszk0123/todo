import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { SelectMode } from '../../viewModels/SelectMode';
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

  const count = categoryEditFormState.selectedCategoryIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  return {
    categories: data?.categories ?? [],
    categoryEditFormState,
    currentCategoryId: categoryEditFormState.selectedCategoryIds[0] ?? null,
    isLoading: !data && loading,
    isSelected: selectMode === SelectMode.SINGLE,
    userId: data?.me?.id,
  };
}
