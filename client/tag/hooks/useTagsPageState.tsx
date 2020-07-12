import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { getSelectMode } from '../../view_models/SelectMode';
import { useTagsPageQuery } from '../graphql/__generated__/TagsPage.graphql';

export function useTagsPageState() {
  const { data, loading, refetch } = useTagsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const tagEditFormState = useTypedSelector((state) => state.tagEditForm);

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
    }
  }, UPDATE_INTERVAL);

  return {
    currentTagId: tagEditFormState.selectedTagIds[0] ?? null,
    isLoading: !data && loading,
    selectMode: getSelectMode(tagEditFormState.selectedTagIds),
    rootCategories: data?.categories ?? [],
    tagEditFormState,
    tags: data?.tags ?? [],
    userId: data?.me?.id ?? null,
  };
}
