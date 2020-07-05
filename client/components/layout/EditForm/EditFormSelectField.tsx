import { Select } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

export function EditFormSelectField<T extends string>({
  isFirst = false,
  selectedItem,
  items,
  onChange,
  parseString: parseValue,
  rightElement,
}: {
  isFirst?: boolean;
  selectedItem: T;
  items: T[];
  onChange: (item: T) => void;
  parseString: (itemAsString: string) => T;
  rightElement?: JSX.Element | null;
}): JSX.Element {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      const parsedValue = parseValue(value);
      onChange(parsedValue);
    },
    [onChange, parseValue]
  );

  return (
    <EditFormField isFirst={isFirst}>
      <Box sx={{ flexGrow: 1 }}>
        <Select value={selectedItem} onChange={handleChange}>
          {items.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </Select>
      </Box>
      {rightElement != null && <Box ml={2}>{rightElement}</Box>}
    </EditFormField>
  );
}
