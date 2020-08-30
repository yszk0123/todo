import React from 'react';
import { Box } from 'rebass';

import { Color } from '../../../view_models/Color';
import { toggleWith } from '../../helpers/toggle';
import { ClosableBadge } from '../ClosableBadge';
import { MiniList, MiniListItem } from '../MiniList';
import { Select } from '../Select';
import { EditFormField } from './EditFormField';

export function EditFormBadgeSelectField<T>({
  getColor,
  getDisplayName,
  getValue,
  id,
  items,
  label,
  onChange,
  rightElement,
  selectedItems,
}: {
  getColor: (item: T) => Color;
  getDisplayName: (item: T, index: number) => string;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  label: string;
  onChange: (items: T[]) => void;
  rightElement?: JSX.Element | null;
  selectedItems: T[];
}): JSX.Element {
  const selectableItems = React.useMemo(() => {
    const set = new Set(selectedItems.map(getValue));
    return items.filter((item) => !set.has(getValue(item)));
  }, [getValue, items, selectedItems]);

  const handleChange = React.useCallback(
    (item: T | null) => {
      if (item !== null) {
        const newItems = toggleWith(selectedItems, item, getValue);
        onChange(newItems);
      }
    },
    [getValue, selectedItems, onChange]
  );

  const isEmpty = selectedItems.length === 0;

  return (
    <EditFormField htmlFor={id} label={label} rightElement={rightElement}>
      <MiniList>
        {selectedItems.map((item, i) => {
          return (
            <MiniListItem key={i}>
              <ClosableBadge
                color={getColor(item)}
                text={getDisplayName(item, i)}
                onClick={() => handleChange(item)}
              />
            </MiniListItem>
          );
        })}
      </MiniList>
      <Box ml={isEmpty ? 0 : 1} sx={{ flexGrow: 1 }}>
        <Select
          getDisplayName={getDisplayName}
          getValue={getValue}
          id={id}
          items={selectableItems}
          selectedItem={null}
          onChange={handleChange}
        />
      </Box>
    </EditFormField>
  );
}
