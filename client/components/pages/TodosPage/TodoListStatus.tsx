// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdHourglassFull,
  MdIndeterminateCheckBox,
} from 'react-icons/md';
import { Flex } from 'rebass';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';

const Status: React.FunctionComponent<{ status: TodoStatus }> = ({
  status,
}) => {
  switch (status) {
    case TodoStatus.Todo:
      return <MdCheckBoxOutlineBlank />;
    case TodoStatus.InProgress:
      return <MdIndeterminateCheckBox />;
    case TodoStatus.Waiting:
      return <MdHourglassFull />;
    case TodoStatus.Done:
      return <MdCheckBox />;
  }
};

export const TodoListStatus: React.FunctionComponent<{
  onClick: () => void;
  status: TodoStatus;
}> = ({ onClick, status }) => {
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <Flex
      alignItems="center"
      color="gray"
      fontSize={24}
      justifyContent="center"
      sx={{ ':hover': { opacity: 0.7 } }}
      onClick={handleClick}
    >
      <Status status={status} />
    </Flex>
  );
};
