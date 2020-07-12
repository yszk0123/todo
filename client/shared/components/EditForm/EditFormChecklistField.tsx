import React from 'react';

import { Displayable } from '../../../view_models/Displayable';
import { Checklist } from '../Checklist';
import { EditFormField } from './EditFormField';

export function EditFormChecklistField<T extends Displayable>({
  checkedItems,
  items,
  label,
  onClick,
  rightElement,
}: {
  checkedItems: T[];
  items: T[];
  label: string;
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  return (
    <EditFormField label={label} rightElement={rightElement}>
      <Checklist checkedItems={checkedItems} items={items} onClick={onClick} />
    </EditFormField>
  );
}
