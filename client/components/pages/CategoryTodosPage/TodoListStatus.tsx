// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import { Flex, Text } from 'rebass';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';

export const TodoListStatus: React.FunctionComponent<{
  status: TodoStatus;
  onClick: () => void;
}> = ({ status, onClick }) => {
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
      height={16}
      justifyContent="center"
      sx={{ border: '2px solid gray', ':hover': { opacity: 0.7 } }}
      width={16}
      onClick={handleClick}
    >
      <Text>{printTodoStatus(status)}</Text>
    </Flex>
  );
};
