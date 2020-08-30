import { Select as RebassSelect } from '@rebass/forms';
import React from 'react';

const DEFAULT_VALUE = '__DEFAULT__';

function Select<T>({
  getDisplayName,
  getValue,
  id,
  items,
  label,
  labelledBy,
  onChange,
  selectedItem,
}: {
  getDisplayName: (item: T, index: number) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label?: string;
  labelledBy?: string;
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
      aria-label={label}
      aria-labelledby={labelledBy}
      id={id}
      value={selectedItem !== null ? getValue(selectedItem) : ''}
      onChange={handleChange}
    >
      <option value={DEFAULT_VALUE}>-</option>
      {items.map((item, i) => {
        const value = getValue(item);
        return (
          <option key={value} value={value}>
            {getDisplayName(item, i)}
          </option>
        );
      })}
    </RebassSelect>
  );
}

const MemoizedSelect = React.memo(Select) as typeof Select;

export { MemoizedSelect as Select };
