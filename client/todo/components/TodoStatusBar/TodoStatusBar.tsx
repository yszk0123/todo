import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarPrimaryRow,
  StatusBarRight,
  StatusBarSecondaryRow,
} from '../../../shared/components/StatusBar';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { getSelectedCount, Selection } from '../../../view_models/Selection';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TodoArchiveStatus } from '../../../view_models/Todo';
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoStatusBarArchiveButton } from './TodoStatusBarArchiveButton';
import { TodoStatusBarCategorySelect } from './TodoStatusBarCategorySelect';
import { TodoStatusBarCheckpointSelect } from './TodoStatusBarCheckpointSelect';
import { TodoStatusBarCount } from './TodoStatusBarCount';
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
  todoSelection: Selection;
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
  todoSelection,
}) => {
  const selected = isSelected(selectMode);
  const searchCheckpoints = React.useMemo(
    () =>
      checkpoints.find((c) => c.id === todoSearchQuery.checkpointId) ?? null,
    [checkpoints, todoSearchQuery]
  );
  const selectedCount = getSelectedCount(todoSelection);

  return (
    <StatusBar>
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
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
          <TodoStatusBarCount
            selectedCount={selectedCount}
            totalCount={count}
          />
          <StatusBarItem>
            <TodoStatusBarSyncStatus isSyncing={isSyncing} />
          </StatusBarItem>
        </StatusBarLeft>
        <StatusBarRight>
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
    </StatusBar>
  );
};
