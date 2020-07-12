import React from 'react';

import { ActionList } from '../../shared/components/ActionList';

export const TodoActionList: React.FunctionComponent<{
  onClickEdit: () => void;
  onClickSearch: () => void;
}> = ({ onClickEdit, onClickSearch }) => {
  const actions = React.useMemo(() => {
    return [
      { label: 'Search', onClick: onClickSearch },
      { label: 'Edit', onClick: onClickEdit },
    ];
  }, [onClickEdit, onClickSearch]);

  return <ActionList actions={actions} />;
};
