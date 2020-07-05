import { Label, Radio } from '@rebass/forms';
import React from 'react';
import { Flex } from 'rebass';

import { EditFormField } from './EditFormField';

function EditFormRadioFieldItem<T>({
  isChecked,
  item,
  label,
  onClick,
}: {
  isChecked: boolean;
  item: T;
  label: string;
  onClick: (item: T) => void;
}): JSX.Element {
  const handleClick = React.useCallback(() => {
    onClick(item);
  }, [item, onClick]);

  return (
    <Flex alignItems="center" sx={{ flexGrow: 1 }}>
      <Label onClick={handleClick}>
        <Flex alignItems="center">
          <Radio checked={isChecked} readOnly />
          {label}
        </Flex>
      </Label>
    </Flex>
  );
}

export function EditFormRadioField<T extends string>({
  items,
  onClick,
  rightElement,
  selectedItem,
}: {
  items: T[];
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
  selectedItem: T | null;
}): JSX.Element {
  return (
    <EditFormField rightElement={rightElement}>
      {items.map((item, i) => {
        return (
          <EditFormRadioFieldItem
            isChecked={item === selectedItem}
            item={item}
            key={i}
            label={item}
            onClick={onClick}
          />
        );
      })}
    </EditFormField>
  );
}
