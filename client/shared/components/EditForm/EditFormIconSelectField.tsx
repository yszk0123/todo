import React from 'react';
import { Box } from 'rebass';

import { IconSelect } from '../IconSelect';
import { EditFormField } from './EditFormField';

export function EditFormIconSelectField<T>({
  getDisplayIcon,
  getValue,
  id,
  items,
  label,
  onChange,
  rightElement,
  selectedItem,
}: {
  getDisplayIcon: (item: T) => JSX.Element;
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
        <IconSelect
          getDisplayIcon={getDisplayIcon}
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
