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
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label: string;
  onChange: (item: T | null) => void;
  rightElement?: JSX.Element | null;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <EditFormField label={label}>
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
      {rightElement != null && <Box ml={2}>{rightElement}</Box>}
    </EditFormField>
  );
}
