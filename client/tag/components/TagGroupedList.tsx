import React from 'react';

import { ID } from '../../view_models/ID';
import { groupTagByParent } from '../../view_models/Tag';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagList } from './TagList';

export const TagGroupedList: React.FunctionComponent<{
  currentTagId: ID;
  onClick: (tag: RootTagFragment) => void;
  tags: RootTagFragment[];
}> = ({ currentTagId, onClick, tags }) => {
  const groups = React.useMemo(() => groupTagByParent(tags), [tags]);

  return (
    <>
      {groups.map((group, i) => {
        return (
          <TagList
            currentTagId={currentTagId}
            group={group}
            key={i}
            onClick={onClick}
          />
        );
      })}
    </>
  );
};
