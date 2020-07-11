import { Select } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

const DEFAULT_VALUE = '__DEFAULT__';

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
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const item = items.find((item) => getValue(item) === value) ?? null;
      onChange(item);
    },
    [getValue, items, onChange]
  );

  return (
    <EditFormField>
      <Box sx={{ flexGrow: 1 }}>
        <Select
          value={selectedItem !== null ? getValue(selectedItem) : ''}
          onChange={handleChange}
        >
          <option value={DEFAULT_VALUE}>-</option>
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
