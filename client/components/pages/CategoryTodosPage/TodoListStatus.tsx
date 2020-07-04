// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import { Flex, Text } from 'rebass';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';

export const TodoListStatus: React.FunctionComponent<{
  status: TodoStatus;
}> = ({ status }) => {
  return (
    <Flex
      width={16}
      height={16}
      alignItems="center"
      justifyContent="center"
      sx={{ border: '2px solid gray' }}
    >
      <Text>{printTodoStatus(status)}</Text>
    </Flex>
  );
};
