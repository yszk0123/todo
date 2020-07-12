import React from 'react';

import { Displayable } from '../../../view_models/Displayable';
import { Checklist } from '../Checklist';
import { EditFormField } from './EditFormField';

export function EditFormChecklistField<T extends Displayable>({
  checkedItems,
  items,
  onClick,
  rightElement,
}: {
  checkedItems: T[];
  items: T[];
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  return (
    <EditFormField rightElement={rightElement}>
      <Checklist checkedItems={checkedItems} items={items} onClick={onClick} />
    </EditFormField>
  );
}
