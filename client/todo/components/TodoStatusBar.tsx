import React from 'react';
import { MdCached, MdCheck } from 'react-icons/md';
import { Flex } from 'rebass';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { Select } from '../../shared/components/Select';
import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarLink,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';
import { SelectMode } from '../../view_models/SelectMode';

const animation = {
  animationName: 'rotation',
  animationIterationCount: 'infinite',
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
} as const;

const SyncStatus: React.FunctionComponent<{ isSyncing: boolean }> = ({
  isSyncing,
}) => {
  if (!isSyncing) {
    return <MdCheck />;
  }

  return (
    <Flex sx={animation}>
      <MdCached />
    </Flex>
  );
};

const getDisplayName = (category: RootCategoryFragment) => category.name;
const getValue = (category: RootCategoryFragment) => category.id;

export const TodoStatusBar: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  count: number;
  isSyncing: boolean;
  onClickArchive: () => void;
  onClickCategory: (category: RootCategoryFragment | null) => void;
  onClickEdit: () => void;
  onClickSearch: () => void;
  selectMode: SelectMode;
}> = ({
  categories,
  category,
  count,
  isSyncing,
  onClickArchive,
  onClickCategory,
  onClickEdit,
  onClickSearch,
  selectMode,
}) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarItem>
          <Select
            getDisplayName={getDisplayName}
            getValue={getValue}
            items={categories}
            selectedItem={category}
            onChange={onClickCategory}
          />
        </StatusBarItem>
        <StatusBarText text={`${count} todos`} />
        <StatusBarItem>
          <SyncStatus isSyncing={isSyncing} />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        {!!category && (
          <StatusBarLink
            as={`/categories/${category.id}/todos/report`}
            href="/categories/[categoryId]/todos/report"
            text="See report"
          />
        )}
        {selectMode !== SelectMode.NONE && (
          <StatusBarButton label="Archive" onClick={onClickArchive} />
        )}
        <StatusBarButton label="Search" onClick={onClickSearch} />
        <StatusBarButton isPrimary label="Edit" onClick={onClickEdit} />
      </StatusBarRight>
    </StatusBar>
  );
};
