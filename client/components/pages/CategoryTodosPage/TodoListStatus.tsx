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
      alignItems="center"
      color="gray"
      height={16}
      justifyContent="center"
      sx={{ border: '2px solid gray' }}
      width={16}
    >
      <Text>{printTodoStatus(status)}</Text>
    </Flex>
  );
};
