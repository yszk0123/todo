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
  StatusBarSecondaryRow,
  StatusBarText,
} from '../../../shared/components/StatusBar';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TodoArchiveStatus } from '../../../view_models/Todo';
import { TodoSecondaryStatusBarCategorySelect } from './TodoSecondaryStatusBarCategorySelect';
import { TodoStatusBarArchiveButton } from './TodoStatusBarArchiveButton';
import { TodoStatusBarCategorySelect } from './TodoStatusBarCategorySelect';
import { TodoStatusBarStatusSelect } from './TodoStatusBarStatusSelect';
import { TodoStatusBarSyncStatus } from './TodoStatusBarSyncStatus';

export const TodoStatusBar: React.FunctionComponent<{
  archiveStatus: TodoArchiveStatus;
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  count: number;
  isSyncing: boolean;
  onChangeStatus: (status: TodoStatus | null) => void;
  onClickArchive: () => void;
  onClickCategory: (category: RootCategoryFragment | null) => void;
  onClickCategoryInSub: (category: RootCategoryFragment | null) => void;
  onClickEdit: () => void;
  onClickSearch: () => void;
  onClickUnarchive: () => void;
  selectMode: SelectMode;
  status: TodoStatus | null;
}> = ({
  archiveStatus,
  categories,
  category,
  count,
  isSyncing,
  onChangeStatus,
  onClickArchive,
  onClickCategory,
  onClickCategoryInSub,
  onClickEdit,
  onClickSearch,
  onClickUnarchive,
  selectMode,
  status,
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
              isSelected={selected}
              onClickArchive={onClickArchive}
              onClickUnarchive={onClickUnarchive}
            />
          )}
          {!selected && (
            <StatusBarButton
              isSelected={selected}
              label="Search"
              onClick={onClickSearch}
            />
          )}
          <StatusBarButton
            isPrimary
            isSelected={selected}
            label={selected ? 'Edit' : 'Create'}
            onClick={onClickEdit}
          />
        </StatusBarRight>
      </StatusBarPrimaryRow>
      {selected && (
        <StatusBarSecondaryRow>
          <StatusBarItem>
            <TodoStatusBarStatusSelect
              status={status}
              onChange={onChangeStatus}
            />
          </StatusBarItem>
          <StatusBarItem>
            <TodoSecondaryStatusBarCategorySelect
              categories={categories}
              category={category}
              onClickCategory={onClickCategoryInSub}
            />
          </StatusBarItem>
        </StatusBarSecondaryRow>
      )}
    </StatusBar>
  );
};
