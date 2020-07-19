import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
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
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoStatusBarArchiveButton } from './TodoStatusBarArchiveButton';
import { TodoStatusBarCategorySelect } from './TodoStatusBarCategorySelect';
import { TodoStatusBarCheckpointSelect } from './TodoStatusBarCheckpointSelect';
import { TodoStatusBarStatusSelect } from './TodoStatusBarStatusSelect';
import { TodoStatusBarSyncStatus } from './TodoStatusBarSyncStatus';

export const TodoStatusBar: React.FunctionComponent<{
  archiveStatus: TodoArchiveStatus;
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  checkpoints: RootCheckpointFragment[];
  count: number;
  isSyncing: boolean;
  onChangeStatus: (status: TodoStatus | null) => void;
  onClickArchive: () => void;
  onClickEdit: () => void;
  onClickEditCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onClickSearch: () => void;
  onClickSearchCategory: (category: RootCategoryFragment | null) => void;
  onClickSearchStatus: (status: TodoStatus | null) => void;
  onClickUnarchive: () => void;
  selectMode: SelectMode;
  status: TodoStatus | null;
  todoSearchQuery: TodoSearchQuery;
}> = ({
  archiveStatus,
  categories,
  category,
  checkpoints,
  count,
  isSyncing,
  onChangeStatus,
  onClickArchive,
  onClickEdit,
  onClickEditCheckpoint,
  onClickSearch,
  onClickSearchCategory,
  onClickSearchStatus,
  onClickUnarchive,
  selectMode,
  status,
  todoSearchQuery,
}) => {
  const selected = isSelected(selectMode);
  const searchCheckpoints = React.useMemo(
    () =>
      checkpoints.find((c) => c.id === todoSearchQuery.checkpointId) ?? null,
    [checkpoints, todoSearchQuery]
  );

  return (
    <StatusBar>
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
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
      {selected ? (
        <StatusBarSecondaryRow>
          <StatusBarLeft>
            <TodoStatusBarStatusSelect
              status={status}
              onChange={onChangeStatus}
            />
          </StatusBarLeft>
          <StatusBarRight>
            <TodoStatusBarCheckpointSelect
              checkpoint={searchCheckpoints}
              checkpoints={checkpoints}
              onClickCheckpoint={onClickEditCheckpoint}
            />
          </StatusBarRight>
        </StatusBarSecondaryRow>
      ) : (
        <StatusBarSecondaryRow>
          <StatusBarLeft>
            <TodoStatusBarStatusSelect
              status={todoSearchQuery.status}
              onChange={onClickSearchStatus}
            />
          </StatusBarLeft>
          <StatusBarRight>
            <TodoStatusBarCategorySelect
              categories={categories}
              category={category}
              onClickCategory={onClickSearchCategory}
            />
          </StatusBarRight>
        </StatusBarSecondaryRow>
      )}
    </StatusBar>
  );
};
