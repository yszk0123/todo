import React from 'react';

import { MiniList, MiniListIconButton } from './MiniList';

export function IconSelect<T>({
  getDisplayIcon,
  getValue,
  items,
  onChange,
  selectedItem,
}: {
  getDisplayIcon: (item: T) => JSX.Element | null;
  getValue: (item: T) => string;
  items: T[];
  onChange: (item: T) => void;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <MiniList>
      {items.map((item) => {
        const icon = getDisplayIcon(item);
        if (icon === null) {
          return null;
        }

        const value = getValue(item);

        return (
          <MiniListIconButton
            icon={icon}
            isSelected={item === selectedItem}
            key={value}
            label={value}
            onClick={() => onChange(item)}
          />
        );
      })}
    </MiniList>
  );
}
