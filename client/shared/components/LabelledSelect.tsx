import { Label } from '@rebass/forms';
import React from 'react';
import { Flex } from 'rebass';

import { Select } from './Select';

export function LabelledSelect<T>({
  getDisplayName,
  getValue,
  id,
  items,
  label,
  onChange,
  selectedItem,
}: {
  getDisplayName: (item: T, index: number) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label: string;
  onChange: (item: T | null) => void;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <Flex alignItems="center">
      <Label htmlFor={id} mr={2} sx={{ flexShrink: 0 }} width="initial">
        {label}
      </Label>
      <Select
        getDisplayName={getDisplayName}
        getValue={getValue}
        id={id}
        items={items}
        selectedItem={selectedItem}
        onChange={onChange}
      />
    </Flex>
  );
}
