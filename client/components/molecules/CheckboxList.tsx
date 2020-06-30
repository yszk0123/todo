import React from 'react';
import { Flex } from 'rebass';
import { DisplayableVM } from '../../viewModels/DisplayableVM';
import { CheckboxListItem } from './CheckboxListItem';
import { createLookupTable } from '../helpers/createLookupTable';

export function CheckboxList<T extends DisplayableVM>({
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
    <Flex alignItems="center">
      {items.map((item, i) => {
        const isChecked = lookupTable[item.id] === true;

        return (
          <CheckboxListItem
            key={item.id}
            isFirst={i === 0}
            item={item}
            isChecked={isChecked}
            onClick={onClick}
          />
        );
      })}
    </Flex>
  );
}
