import React from 'react';
import { Box } from 'rebass';

import { Color } from '../../../view_models/Color';
import { ClosableBadge } from '../ClosableBadge';
import { MiniList, MiniListItem } from '../MiniList';
import { Select } from '../Select';
import { EditFormField } from './EditFormField';

export function EditFormBadgeSelectField<T>({
  getColor,
  getDisplayName,
  getValue,
  items,
  label,
  onDeselect,
  onSelect,
  rightElement,
  selectedItems,
}: {
  getColor: (item: T) => Color;
  getDisplayName: (item: T) => string;
  getValue: (item: T) => string;
  items: T[];
  label: string;
  onDeselect: (item: T) => void;
  onSelect: (item: T) => void;
  rightElement?: JSX.Element | null;
  selectedItems: T[];
}): JSX.Element {
  const selectableItems = React.useMemo(() => {
    const set = new Set(selectedItems.map(getValue));
    return items.filter((item) => !set.has(getValue(item)));
  }, [getValue, items, selectedItems]);

  const handleSelect = React.useCallback(
    (item: T | null) => {
      if (item !== null) {
        onSelect(item);
      }
    },
    [onSelect]
  );

  const isEmpty = selectedItems.length === 0;

  return (
    <EditFormField label={label}>
      <MiniList>
        {selectedItems.map((item, i) => {
          return (
            <MiniListItem key={i}>
              <ClosableBadge
                color={getColor(item)}
                text={getDisplayName(item)}
                onClick={() => onDeselect(item)}
              />
            </MiniListItem>
          );
        })}
      </MiniList>
      <Box ml={isEmpty ? 0 : 1} sx={{ flexGrow: 1 }}>
        <Select
          getDisplayName={getDisplayName}
          getValue={getValue}
          items={selectableItems}
          selectedItem={null}
          onChange={handleSelect}
        />
      </Box>
      {rightElement != null && <Box ml={2}>{rightElement}</Box>}
    </EditFormField>
  );
}
