import { Select } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

export function EditFormSelectField<T>({
  isFirst = false,
  selectedItem,
  items,
  getDisplayName,
  getValue,
  onChange,
  rightElement,
}: {
  isFirst?: boolean;
  selectedItem: T | null;
  items: T[];
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  onChange: (item: T) => void;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const item = items.find((item) => getValue(item) === value);
      if (item) {
        onChange(item);
      }
    },
    [getValue, items, onChange]
  );

  return (
    <EditFormField isFirst={isFirst}>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          value={selectedItem !== null ? getValue(selectedItem) : ''}
          onChange={handleChange}
        >
          {items.map((item) => {
            const value = getValue(item);
            return (
              <option key={value} value={value}>
                {getDisplayName(item)}
              </option>
            );
          })}
        </Select>
      </Box>
      {rightElement != null && <Box ml={2}>{rightElement}</Box>}
    </EditFormField>
  );
}
