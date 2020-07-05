import React from 'react';
import { Flex } from 'rebass';
import { DisplayableVM } from '../../../viewModels/DisplayableVM';
import { ChecklistItem } from './ChecklistItem';
import { createLookupTable } from '../../helpers/createLookupTable';

export function Checklist<T extends DisplayableVM>({
  items,
  checkedItems,
  onClick,
}: {
  items: T[];
  checkedItems: T[];
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
