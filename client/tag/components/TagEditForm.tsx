import React from 'react';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { ColorBox } from '../../shared/components/ColorBox';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormChecklistField,
  EditFormInputField,
  EditFormSelectField,
} from '../../shared/components/EditForm';
import { Modal } from '../../shared/components/Modal';
import { Color } from '../../shared/graphql/__generated__/baseTypes';
import { identity } from '../../shared/helpers/identity';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { TagEditFormState } from '../ducks/TagEditFormDucks';

const colors = Object.values(Color);

export const TagEditForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  isOpen: boolean;
  onArchiveOneTag: () => void;
  onChangeColor: (color: Color | null) => void;
  onChangeName: (name: string) => void;
  onCloseModal: () => void;
  onCreateOneTag: () => void;
  onDeleteOneTag: () => void;
  onToggleCategory: (category: RootCategoryFragment) => void;
  onUpdateOneTag: () => void;
  selectMode: SelectMode;
  tagCategories: RootCategoryFragment[];
  tagEditFormState: TagEditFormState;
}> = ({
  categories,
  isOpen,
  onArchiveOneTag,
  onChangeColor,
  onChangeName,
  onCloseModal,
  onCreateOneTag,
  onDeleteOneTag,
  onToggleCategory,
  onUpdateOneTag,
  selectMode,
  tagCategories,
  tagEditFormState,
}) => {
  const actions: EditFormAction[] = isSelected(selectMode)
    ? [
        { label: 'Delete', onClick: onDeleteOneTag },
        { label: 'Archive', onClick: onArchiveOneTag },
        { label: 'Update', onClick: onUpdateOneTag },
      ]
    : [{ label: 'Create', onClick: onCreateOneTag }];

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <EditForm>
        <EditFormChecklistField
          checkedItems={tagCategories}
          items={categories}
          label="Categories"
          onClick={onToggleCategory}
        />
        <EditFormInputField
          label="Name"
          value={tagEditFormState.name}
          onChange={onChangeName}
        />
        <EditFormSelectField
          getDisplayName={identity}
          getValue={identity}
          items={colors}
          label="Color"
          rightElement={<ColorBox color={tagEditFormState.color} />}
          selectedItem={tagEditFormState.color}
          onChange={onChangeColor}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
