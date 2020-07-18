import React from 'react';

import { MiniList, MiniListIconCheckbox } from './MiniList';

function IconSelect<T>({
  getDisplayIcon,
  getValue,
  id,
  items,
  onChange,
  selectedItem,
}: {
  getDisplayIcon: (item: T) => React.ElementType | null;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  onChange: (item: T) => void;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <MiniList id={id}>
      {items.map((item) => {
        const icon = getDisplayIcon(item);
        if (icon === null) {
          return null;
        }

        const value = getValue(item);

        return (
          <MiniListIconCheckbox
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

const MemoizedIconSelect = React.memo(IconSelect) as typeof IconSelect;

export { MemoizedIconSelect as IconSelect };
