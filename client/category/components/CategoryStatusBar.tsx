import React from 'react';

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
} from '../../shared/components/StatusBar';
import { ID } from '../../view_models/ID';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CategoryIcon } from './CategoryIcon';

export const CategoryStatusBar: React.FunctionComponent<{
  count: number;
  currentCategoryId: ID | null;
  onClickArchive: () => void;
  onClickEdit: () => void;
  selectMode: SelectMode;
}> = ({
  count,
  currentCategoryId,
  onClickArchive,
  onClickEdit,
  selectMode,
}) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar>
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
          <StatusBarText text={`${count} categories`} />
          <StatusBarItem>
            <CategoryIcon />
          </StatusBarItem>
        </StatusBarLeft>
        <StatusBarRight>
          {selected && (
            <StatusBarButton
              isSelected={selected}
              label="Archive"
              onClick={onClickArchive}
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
      {currentCategoryId !== null && (
        <StatusBarSecondaryRow>
          <StatusBarLeft>
            <StatusBarLink
              as={`/categories/${currentCategoryId}/todos/report`}
              href="/categories/[categoryId]/todos/report"
              text="See report"
            />
          </StatusBarLeft>
        </StatusBarSecondaryRow>
      )}
    </StatusBar>
  );
};
