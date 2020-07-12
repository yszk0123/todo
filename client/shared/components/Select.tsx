import { Select as RebassSelect } from '@rebass/forms';
import React from 'react';

const DEFAULT_VALUE = '__DEFAULT__';

export function Select<T>({
  getDisplayName,
  getValue,
  items,
  onChange,
  selectedItem,
}: {
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  items: T[];
  onChange: (item: T | null) => void;
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
    <RebassSelect
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
    </RebassSelect>
  );
}
