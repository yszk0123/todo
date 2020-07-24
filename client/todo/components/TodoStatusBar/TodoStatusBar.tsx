import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  StatusBar,
  StatusBarButton,
  StatusBarExpandableSecondaryRow,
  StatusBarItem,
  StatusBarLeft,
  StatusBarPrimaryRow,
  StatusBarRight,
} from '../../../shared/components/StatusBar';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { getSelectedCount, Selection } from '../../../view_models/Selection';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TodoArchiveStatus } from '../../../view_models/Todo';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoSearchFormAsInline } from '../TodoSearchForm';
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
  categoryTags: TodoTagFragment[];
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
  onSearchChangeStatus: (status: TodoStatus | null) => void;
  onSearchSelectCategory: (category: RootCategoryFragment | null) => void;
  onSearchSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSearchToggleTag: (tag: TodoTagFragment) => void;
  selectMode: SelectMode;
  status: TodoStatus | null;
  todoSearchQuery: TodoSearchQuery;
  todoSelection: Selection;
}> = ({
  archiveStatus,
  categories,
  category,
  categoryTags,
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
  onSearchChangeStatus,
  onSearchSelectCategory,
  onSearchSelectCheckpoint,
  onSearchToggleTag,
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

  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleToggle = React.useCallback(() => {
    setIsExpanded((v) => !v);
  }, []);

  return (
    <StatusBar>
      {selected ? (
        <StatusBarExpandableSecondaryRow
          isExpanded={isExpanded}
          onToggle={handleToggle}
        >
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
        </StatusBarExpandableSecondaryRow>
      ) : (
        <StatusBarExpandableSecondaryRow
          isExpanded={isExpanded}
          onToggle={handleToggle}
        >
          {isExpanded ? (
            <TodoSearchFormAsInline
              categories={categories}
              categoryTags={categoryTags}
              checkpoints={checkpoints}
              todoSearchQuery={todoSearchQuery}
              onChangeStatus={onSearchChangeStatus}
              onSelectCategory={onSearchSelectCategory}
              onSelectCheckpoint={onSearchSelectCheckpoint}
              onToggleTag={onSearchToggleTag}
            />
          ) : (
            <>
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
            </>
          )}
        </StatusBarExpandableSecondaryRow>
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
