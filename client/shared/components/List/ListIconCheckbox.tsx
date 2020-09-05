import React from 'react';

import { Checkbox } from '../Checkbox';

type Props<T> = {
  icon: React.ElementType | null;
  isSelected: boolean;
  item: T;
  label: string;
  onClick: (item: T) => void;
};

function ListIconCheckbox<T>(
  { icon, isSelected, item, label, onClick }: Props<T>,
  ref: React.Ref<unknown>
): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();
      onClick(item);
    },
    [item, onClick]
  );

  return (
    <Checkbox
      aria-label={label}
      checked={isSelected}
      icon={icon}
      marginRight={0}
      readOnly
      ref={ref}
      onClick={handleClick}
    />
  );
}

const ForwardedListIconCheckbox = React.forwardRef(ListIconCheckbox);

export { ForwardedListIconCheckbox as ListIconCheckbox };
