import React from 'react';
import { Flex, Text } from 'rebass';
import { Checkbox } from '@rebass/forms';
import { preventDefault } from '../../../handlers/preventDefault';
import { DisplayableVM } from '../../../viewModels/DisplayableVM';

export function ChecklistItem<T extends DisplayableVM>({
  item,
  isFirst,
  isChecked,
  onClick,
}: {
  item: T;
  isFirst: boolean;
  isChecked: boolean;
  onClick: (item: T) => void;
}): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.SyntheticEvent) => {
      onClick(item);
      event.preventDefault();
    },
    [item, onClick]
  );

  return (
    <Flex
      ml={isFirst ? undefined : 3}
      alignItems="center"
      key={item.id}
      onClick={handleClick}
    >
      <Checkbox readOnly checked={isChecked} onClick={preventDefault} />
      <Text>{item.name}</Text>
    </Flex>
  );
}
