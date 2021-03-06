import React from 'react';
import { Box } from 'rebass';

import { Select } from '../Select';
import { EditFormField } from './EditFormField';

export function EditFormSelectField<T>({
  getDisplayName,
  getValue,
  id,
  items,
  label,
  onChange,
  rightElement,
  selectedItem,
}: {
  getDisplayName: (item: T, index: number) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label: string;
  onChange: (item: T | null) => void;
  rightElement?: JSX.Element | null;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <EditFormField htmlFor={id} label={label} rightElement={rightElement}>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          getDisplayName={getDisplayName}
          getValue={getValue}
          id={id}
          items={items}
          selectedItem={selectedItem}
          onChange={onChange}
        />
      </Box>
    </EditFormField>
  );
}
