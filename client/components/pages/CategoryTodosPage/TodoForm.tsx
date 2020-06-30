import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Label, Radio, Input } from '@rebass/forms';
import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { CheckboxList } from '../../molecules/CheckboxList';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';

const StatusSelect: React.FunctionComponent<{
  status: TodoStatus;
  onClick: (status: TodoStatus) => void;
}> = ({ status, onClick }) => {
  const handleClickTodo = React.useCallback(() => {
    onClick(TodoStatus.Todo);
  }, [onClick]);
  const handleClickInProgress = React.useCallback(() => {
    onClick(TodoStatus.InProgress);
  }, [onClick]);
  const handleClickWaiting = React.useCallback(() => {
    onClick(TodoStatus.Waiting);
  }, [onClick]);
  const handleClickDone = React.useCallback(() => {
    onClick(TodoStatus.Done);
  }, [onClick]);

  return (
    <Box>
      <Label onClick={handleClickTodo}>
        <Radio
          name="status"
          value="Todo"
          checked={status === TodoStatus.Todo}
          readOnly
        />
        Todo
      </Label>
      <Label onClick={handleClickInProgress}>
        <Radio
          name="status"
          value="InProgress"
          checked={status === TodoStatus.InProgress}
          readOnly
        />
        InProgress
      </Label>
      <Label onClick={handleClickWaiting}>
        <Radio
          name="status"
          value="Waiting"
          checked={status === TodoStatus.Waiting}
          readOnly
        />
        Waiting
      </Label>
      <Label onClick={handleClickDone}>
        <Radio
          name="status"
          value="Done"
          checked={status === TodoStatus.Done}
          readOnly
        />
        Done
      </Label>
    </Box>
  );
};

export const TodoForm: React.FunctionComponent<{
  name: string;
  tags: CategoryTagFragment[];
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  name,
  tags,
  status,
  categoryTags,
  isSelected,
  onChangeName,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
}) => {
  return (
    <Box as="form" my={4} onSubmit={preventDefault} onClick={stopPropagation}>
      <Flex mt={2}>
        <CheckboxList
          items={categoryTags}
          checkedItems={tags}
          onClick={onToggleTag}
        />
      </Flex>
      <Flex mt={2} alignItems="center">
        <StatusSelect status={status} onClick={onSelectStatus} />
      </Flex>
      <Flex mt={2} alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        {isSelected ? (
          <>
            <Button type="button" variant="outline" onClick={onDeleteOneTodo}>
              Delete
            </Button>
            <Button
              type="button"
              variant="outline"
              ml={2}
              onClick={onArchiveTodo}
            >
              Archive
            </Button>
            <Button
              type="submit"
              width={1}
              variant="primary"
              ml={2}
              onClick={onUpdateOneTodo}
            >
              Update
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            width={1}
            variant="primary"
            onClick={onCreateOneTodo}
          >
            Create
          </Button>
        )}
      </Flex>
    </Box>
  );
};
