import React from 'react';

import { MiniList, MiniListIconCheckbox } from './MiniList';

type Props<T> = {
  getDisplayIcon: (item: T) => React.ElementType | null;
  getValue: (item: T) => string;
  id: string;
  items: T[];
  onChange: (item: T) => void;
  selectedItem: T | null;
};

function IconSelect<T>(
  { getDisplayIcon, getValue, id, items, onChange, selectedItem }: Props<T>,
  ref: React.Ref<unknown>
): JSX.Element {
  return (
    <MiniList id={id} ref={ref}>
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

const ForwardedIconSelect = React.forwardRef(IconSelect);
const MemoizedForwardedIconSelect = React.memo(ForwardedIconSelect);

export { MemoizedForwardedIconSelect as IconSelect };
