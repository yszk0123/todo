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
  getDisplayIcon: (item: T) => React.ElementType;
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
        <IconSelect
          getDisplayIcon={getDisplayIcon}
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
