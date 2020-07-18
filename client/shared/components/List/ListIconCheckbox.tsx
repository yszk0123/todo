import React from 'react';

import { Checkbox } from '../Checkbox';

export function ListIconCheckbox<T>({
  icon,
  isSelected,
  item,
  label,
  onClick,
}: {
  icon: React.ElementType | null;
  isSelected: boolean;
  item: T;
  label: string;
  onClick: (item: T) => void;
}): JSX.Element {
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
      onClick={handleClick}
    />
  );
}
