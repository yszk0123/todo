import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Flex, Text } from 'rebass';

import { Displayable } from '../../../view_models/Displayable';
import { preventDefault } from '../../view_helpers/preventDefault';

export function ChecklistItem<T extends Displayable>({
  isChecked,
  isFirst,
  item,
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
