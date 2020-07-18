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
  labelId,
  onChange,
  selectedItem,
}: {
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label: string;
  labelId: string;
  onChange: (item: T | null) => void;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <Flex alignItems="center">
      <Label id={labelId} mr={2} width="initial">
        {label}
      </Label>
      <Select
        getDisplayName={getDisplayName}
        getValue={getValue}
        id={id}
        items={items}
        labelledBy={labelId}
        selectedItem={selectedItem}
        onChange={onChange}
      />
    </Flex>
  );
}
