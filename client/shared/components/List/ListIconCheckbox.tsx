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
      color="gray"
      icon={icon}
      marginRight={0}
      readOnly
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        ':hover': { opacity: 0.7 },
      }}
      onClick={handleClick}
    />
  );
}
