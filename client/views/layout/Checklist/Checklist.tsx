import React from 'react';
import { Flex } from 'rebass';

import { createLookupTable } from '../../../helpers/createLookupTable';
import { Displayable } from '../../../viewModels/Displayable';
import { ChecklistItem } from './ChecklistItem';

export function Checklist<T extends Displayable>({
  checkedItems,
  items,
  onClick,
}: {
  checkedItems: T[];
  items: T[];
  onClick: (item: T) => void;
}): JSX.Element {
  const lookupTable = React.useMemo(() => createLookupTable(checkedItems), [
    checkedItems,
  ]);

  return (
    <Flex alignItems="center" flexWrap="wrap">
      {items.map((item, i) => {
        const isChecked = lookupTable[item.id] === true;

        return (
          <ChecklistItem
            isChecked={isChecked}
            isFirst={i === 0}
            item={item}
            key={item.id}
            onClick={onClick}
          />
        );
      })}
    </Flex>
  );
}
