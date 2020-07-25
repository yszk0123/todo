import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { CheckpointIcon } from '../../../checkpoint/components/CheckpointIcon';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  StatusBar,
  StatusBarBadges,
  StatusBarButton,
  StatusBarExpandableSecondaryRow,
  StatusBarItem,
  StatusBarLabel,
  StatusBarLeft,
  StatusBarPrimaryRow,
  StatusBarRight,
  StatusBarText,
} from '../../../shared/components/StatusBar';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { isNotUndefined } from '../../../shared/helpers/isNotUndefined';
import { DateTime } from '../../../view_models/DateTime';
import { getSelectedCount, Selection } from '../../../view_models/Selection';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TodoArchiveStatus } from '../../../view_models/Todo';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoSearchFormAsInline } from '../TodoSearchForm';
import { TodoStatusBarArchiveButton } from './TodoStatusBarArchiveButton';
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
  onClickSearchStatus: (status: TodoStatus | null) => void;
  onClickUnarchive: () => void;
  onSearchChangeArchivedAt: (archivedAt: DateTime | null) => void;
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
  onClickSearchStatus,
  onClickUnarchive,
  onSearchChangeArchivedAt,
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
  const searchCheckpoint = React.useMemo(
    () =>
      checkpoints.find((c) => c.id === todoSearchQuery.checkpointId) ?? null,
    [checkpoints, todoSearchQuery]
  );
  const selectedTags = React.useMemo(() => {
    return (
      todoSearchQuery.tagIds
        ?.map((tagId) => categoryTags.find((tag) => tag.id === tagId))
        .filter(isNotUndefined) ?? null
    );
  }, [todoSearchQuery, categoryTags]);
  const selectedCount = getSelectedCount(todoSelection);
  const handleSearchDeselectCategory = React.useCallback(() => {
    onSearchSelectCategory(null);
  }, [onSearchSelectCategory]);
  const handleSearchDeselectCheckpoint = React.useCallback(() => {
    onSearchSelectCheckpoint(null);
  }, [onSearchSelectCheckpoint]);

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
              checkpoint={searchCheckpoint}
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
              onChangeArchivedAt={onSearchChangeArchivedAt}
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
                {searchCheckpoint?.name != null && (
                  <>
                    <StatusBarItem onClick={handleSearchDeselectCheckpoint}>
                      <CheckpointIcon />
                    </StatusBarItem>
                    <StatusBarText text={searchCheckpoint.name} />
                  </>
                )}
                {selectedTags !== null && (
                  <StatusBarBadges
                    items={selectedTags}
                    onClick={onSearchToggleTag}
                  />
                )}
                {category !== null && (
                  <StatusBarLabel
                    item={category}
                    onClick={handleSearchDeselectCategory}
                  />
                )}
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
