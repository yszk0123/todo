import { Label, Radio } from '@rebass/forms';
import React from 'react';
import { Flex } from 'rebass';

import { EditFormField } from './EditFormField';

function EditFormRadioFieldItem<T>({
  label,
  item,
  onClick,
  isChecked,
}: {
  label: string;
  item: T;
  isChecked: boolean;
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
  selectedItem,
  items,
  onClick,
  rightElement,
  isFirst = false,
}: {
  selectedItem: T | null;
  items: T[];
  onClick: (item: T) => void;
  rightElement?: JSX.Element | null;
  isFirst?: boolean;
}): JSX.Element {
  return (
    <EditFormField isFirst={isFirst} rightElement={rightElement}>
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
