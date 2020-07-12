import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Button } from 'rebass';

import { isSSR } from '../../helpers/isSSR';
import { MiniList, MiniListItem } from '../MiniList';

export type ActionListItem = {
  label: string;
  onClick: () => void;
};

const ActionButton: React.FunctionComponent<{
  isPrimary: boolean;
  label: string;
  onClick: () => void;
}> = ({ isPrimary, label, onClick }) => {
  return (
    <Button
      type={isPrimary ? 'submit' : 'button'}
      variant={isPrimary ? 'primary' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const ActionList: React.FunctionComponent<{
  actions: ActionListItem[];
}> = ({ actions }) => {
  if (actions.length === 0 || isSSR()) {
    return null;
  }

  const lastIndex = actions.length - 1;

  return ReactDOM.createPortal(
    <Box sx={{ position: 'sticky', zIndex: 2, bottom: 0 }}>
      <MiniList>
        {actions.map((action, i) => {
          return (
            <MiniListItem isPrimary={i === lastIndex} key={i}>
              <ActionButton
                isPrimary={i === lastIndex}
                key={i}
                label={action.label}
                onClick={action.onClick}
              />
            </MiniListItem>
          );
        })}
      </MiniList>
    </Box>,
    document.body
  );
};
