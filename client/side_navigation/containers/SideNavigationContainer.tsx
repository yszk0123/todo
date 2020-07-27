import React from 'react';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { SideBar } from '../../shared/components/SideBar';
import { noop } from '../../shared/helpers/noop';
import { EmptyProps } from '../../view_models/EmptyProps';
import { CategoryList } from '../components/CategoryList';
import { useSideNavigationContainerState } from '../hooks/useSideNavigationContainerState';

const WIDTH_THRESHOLD = 700;

export const SideNavigationContainer: React.FunctionComponent<EmptyProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { categories, isLoading } = useSideNavigationContainerState(isOpen);

  React.useEffect(() => {
    const rect = document.body.getBoundingClientRect();
    if (rect.width >= WIDTH_THRESHOLD) {
      setIsOpen(true);
    }
  }, []);

  return (
    <SideBar isOpen={isOpen} onClose={noop}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <CategoryList categories={categories} />
      )}
    </SideBar>
  );
};
