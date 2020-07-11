import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { useTagsPageQuery } from '../../../graphql/__generated__/TagsPage.graphql';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';

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
