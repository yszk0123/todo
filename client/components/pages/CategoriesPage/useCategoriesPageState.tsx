import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { useCategoriesPageQuery } from '../../../graphql/__generated__/CategoriesPage.graphql';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';

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
