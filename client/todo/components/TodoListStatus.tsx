import React from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdHourglassFull,
  MdIndeterminateCheckBox,
} from 'react-icons/md';

import { ListIcon } from '../../shared/components/List';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';

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

export const TodoListStatusIcon: React.FunctionComponent<{
  onClick: () => void;
  status: TodoStatus;
}> = ({ onClick, status }) => {
  return <ListIcon icon={<Status status={status} />} onClick={onClick} />;
};
