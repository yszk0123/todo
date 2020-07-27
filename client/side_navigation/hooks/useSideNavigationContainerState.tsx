import { EMPTY } from '../../shared/constants/EMPTY';
import { useSideNavigationContainerQuery } from '../graphql/__generated__/SideNavigationContainer.graphql';

export function useSideNavigationContainerState(isEnabled: boolean) {
  const { data, loading } = useSideNavigationContainerQuery({
    fetchPolicy: 'cache-first',
    skip: !isEnabled,
  });

  return {
    categories: data?.categories ?? EMPTY,
    isLoading: !data && loading,
  };
}
