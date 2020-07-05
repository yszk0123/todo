import React from 'react';
import { Checklist } from '../Checklist';
import { DisplayableVM } from '../../../viewModels/DisplayableVM';
import { EditFormField } from './EditFormField';

export function EditFormChecklistField<T extends DisplayableVM>({
  items,
  checkedItems,
  onClick,
  rightElement,
  isFirst = false,
}: {
  items: T[];
  checkedItems: T[];
  onClick: (item: T) => void;
  isFirst?: boolean;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  return (
    <EditFormField isFirst={isFirst} rightElement={rightElement}>
      <Checklist checkedItems={checkedItems} items={items} onClick={onClick} />
    </EditFormField>
  );
}
