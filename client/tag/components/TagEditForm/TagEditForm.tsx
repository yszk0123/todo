import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { ColorBox } from '../../../shared/components/ColorBox';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
  EditFormSelectField,
} from '../../../shared/components/EditForm';
import { Modal } from '../../../shared/components/Modal';
import { Color } from '../../../shared/graphql/__generated__/baseTypes';
import { identity } from '../../../shared/helpers/identity';
import { isSelected, SelectMode } from '../../../view_models/SelectMode';
import { TagEditFormState } from '../../ducks/TagEditFormDucks';
import { TagEditFormCategoriesField } from './TagEditFormCategoriesField';

const colors = Object.values(Color);

export const TagEditForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  isOpen: boolean;
  onChangeCategories: (categories: RootCategoryFragment[]) => void;
  onChangeColor: (color: Color | null) => void;
  onChangeName: (name: string) => void;
  onCloseModal: () => void;
  onCreateOneTag: () => void;
  onDeleteOneTag: () => void;
  onUpdateOneTag: () => void;
  selectMode: SelectMode;
  tagCategories: RootCategoryFragment[];
  tagEditFormState: TagEditFormState;
}> = ({
  categories,
  isOpen,
  onChangeCategories,
  onChangeColor,
  onChangeName,
  onCloseModal,
  onCreateOneTag,
  onDeleteOneTag,
  onUpdateOneTag,
  selectMode,
  tagCategories,
  tagEditFormState,
}) => {
  const actions: EditFormAction[] = isSelected(selectMode)
    ? [
        { label: 'Delete', onClick: onDeleteOneTag },
        { label: 'Update', onClick: onUpdateOneTag },
      ]
    : [{ label: 'Create', onClick: onCreateOneTag }];

  return (
    <Modal
      initialFocusSelector="#tag-edit-name"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
        <TagEditFormCategoriesField
          categories={categories}
          selectedCategories={tagCategories}
          onChange={onChangeCategories}
        />
        <EditFormInputField
          id="tag-edit-name"
          label="Name"
          value={tagEditFormState.name}
          onChange={onChangeName}
        />
        <EditFormSelectField
          getDisplayName={identity}
          getValue={identity}
          id="tag-edit-color"
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
