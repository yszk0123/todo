import React from 'react';

import { Displayable } from '../../../view_models/Displayable';
import { Checklist } from '../Checklist';
import { EditFormField } from './EditFormField';

export function EditFormChecklistField<T extends Displayable>({
  checkedItems,
  id,
  items,
  label,
  onClick,
  rightElement,
}: {
  checkedItems: T[];
  id: string;
  items: T[];
  label: string;
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  return (
    <EditFormField label={label} rightElement={rightElement}>
      <Checklist
        checkedItems={checkedItems}
        id={id}
        items={items}
        onClick={onClick}
      />
    </EditFormField>
  );
}
