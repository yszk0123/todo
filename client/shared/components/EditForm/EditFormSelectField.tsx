import React from 'react';
import { Box } from 'rebass';

import { Select } from '../Select';
import { EditFormField } from './EditFormField';

export function EditFormSelectField<T>({
  getDisplayName,
  getValue,
  items,
  onChange,
  rightElement,
  selectedItem,
}: {
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  items: T[];
  onChange: (item: T | null) => void;
  rightElement?: JSX.Element | null;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <EditFormField>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          getDisplayName={getDisplayName}
          getValue={getValue}
          items={items}
          selectedItem={selectedItem}
          onChange={onChange}
        />
      </Box>
      {rightElement != null && <Box ml={2}>{rightElement}</Box>}
    </EditFormField>
  );
}
