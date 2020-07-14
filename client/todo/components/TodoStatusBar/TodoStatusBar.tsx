import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarLink,
  StatusBarPrimaryRow,
  StatusBarRight,
  StatusBarText,
} from '../../../shared/components/StatusBar';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TodoArchiveStatus } from '../../../view_models/Todo';
import { TodoStatusBarArchiveButton } from './TodoStatusBarArchiveButton';
import { TodoStatusBarCategorySelect } from './TodoStatusBarCategorySelect';
import { TodoStatusBarSyncStatus } from './TodoStatusBarSyncStatus';

export const TodoStatusBar: React.FunctionComponent<{
  archiveStatus: TodoArchiveStatus;
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  count: number;
  isSyncing: boolean;
  onClickArchive: () => void;
  onClickCategory: (category: RootCategoryFragment | null) => void;
  onClickEdit: () => void;
  onClickSearch: () => void;
  onClickUnarchive: () => void;
  selectMode: SelectMode;
}> = ({
  archiveStatus,
  categories,
  category,
  count,
  isSyncing,
  onClickArchive,
  onClickCategory,
  onClickEdit,
  onClickSearch,
  onClickUnarchive,
  selectMode,
}) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar>
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
          <StatusBarItem>
            <TodoStatusBarCategorySelect
              categories={categories}
              category={category}
              onClickCategory={onClickCategory}
            />
          </StatusBarItem>
          <StatusBarText text={`${count} todos`} />
          <StatusBarItem>
            <TodoStatusBarSyncStatus isSyncing={isSyncing} />
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
          {selected && (
            <TodoStatusBarArchiveButton
              archiveStatus={archiveStatus}
              onClickArchive={onClickArchive}
              onClickUnarchive={onClickUnarchive}
            />
          )}
          {!selected && (
            <StatusBarButton label="Search" onClick={onClickSearch} />
          )}
          <StatusBarButton
            isPrimary
            label={selected ? 'Edit' : 'Create'}
            onClick={onClickEdit}
          />
        </StatusBarRight>
      </StatusBarPrimaryRow>
    </StatusBar>
  );
};
