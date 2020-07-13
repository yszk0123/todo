import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

export function ListCheckbox<T>({
  isSelected,
  item,
  onClick,
}: {
  isSelected: boolean;
  item: T;
  onClick: (item: T) => void;
}): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(item);
    },
    [item, onClick]
  );

  return (
    <Box onClick={handleClick}>
      <Checkbox checked={isSelected} marginRight={0} readOnly />
    </Box>
  );
}
