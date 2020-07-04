import React from 'react';
import { CheckboxList } from '../../molecules/CheckboxList';
import { DisplayableVM } from '../../../viewModels/DisplayableVM';
import { EditFormField } from './EditFormField';

export function EditFormChecklistField<T extends DisplayableVM>({
  items,
  checkedItems,
  onClick,
  isFirst = false,
}: {
  items: T[];
  checkedItems: T[];
  onClick: (item: T) => void;
  isFirst?: boolean;
}): JSX.Element {
  return (
    <EditFormField isFirst={isFirst}>
      <CheckboxList
        items={items}
        checkedItems={checkedItems}
        onClick={onClick}
      />
    </EditFormField>
  );
}
