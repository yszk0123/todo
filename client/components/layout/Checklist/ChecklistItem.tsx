import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Flex, Text } from 'rebass';

import { preventDefault } from '../../../handlers/preventDefault';
import { DisplayableVM } from '../../../viewModels/DisplayableVM';

export function ChecklistItem<T extends DisplayableVM>({
  item,
  isFirst,
  isChecked,
  onClick,
}: {
  isChecked: boolean;
  isFirst: boolean;
  item: T;
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
      alignItems="center"
      key={item.id}
      ml={isFirst ? undefined : 3}
      onClick={handleClick}
    >
      <Checkbox checked={isChecked} readOnly onClick={preventDefault} />
      <Text>{item.name}</Text>
    </Flex>
  );
}
