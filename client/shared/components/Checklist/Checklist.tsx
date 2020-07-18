import React from 'react';
import { Flex } from 'rebass';

import { Displayable } from '../../../view_models/Displayable';
import { createLookupTable } from '../../helpers/createLookupTable';
import { ChecklistItem } from './ChecklistItem';

function Checklist<T extends Displayable>({
  checkedItems,
  id,
  items,
  onClick,
}: {
  checkedItems: T[];
  id: string;
  items: T[];
  onClick: (item: T) => void;
}): JSX.Element {
  const lookupTable = React.useMemo(() => createLookupTable(checkedItems), [
    checkedItems,
  ]);

  return (
    <Flex alignItems="center" flexWrap="wrap" id={id}>
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

const MemoizedChecklist = React.memo(Checklist) as typeof Checklist;

export { MemoizedChecklist as Checklist };
