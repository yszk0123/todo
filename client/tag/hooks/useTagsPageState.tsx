import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { SelectMode } from '../../view_models/SelectMode';
import { useTagsPageQuery } from '../graphql/__generated__/TagsPage.graphql';

export function useTagsPageState() {
  const { data, loading, refetch } = useTagsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const tagEditFormState = useTypedSelector((state) => state.tagEditForm);

  const count = tagEditFormState.selectedTagIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
    }
  }, UPDATE_INTERVAL);

  return {
    currentTagId: tagEditFormState.selectedTagIds[0] ?? null,
    isLoading: !data && loading,
    isSelected: selectMode === SelectMode.SINGLE,
    rootCategories: data?.categories ?? [],
    tagEditFormState,
    tags: data?.tags ?? [],
    userId: data?.me?.id ?? null,
  };
}
