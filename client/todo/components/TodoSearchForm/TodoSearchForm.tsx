import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { TodoSearchFormValue } from '../../ducks/TodoSearchFormDucks';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchFormCategoryField } from './TodoSearchFormCategoryField';
import { TodoSearchFormCheckpointField } from './TodoSearchFormCheckpointField';
import { TodoSearchFormStatusField } from './TodoSearchFormStatusField';
import { TodoSearchFormTagsField } from './TodoSearchFormTagsField';
import { TodoSearchFormTextField } from './TodoSearchFormTextField';

export const TodoSearchForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeText: (text: string) => void;
  onCommit: () => void;
  onReset: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchFormValue: TodoSearchFormValue;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeText,
  onCommit,
  onReset,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  todoSearchFormValue,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Reset', onClick: onReset },
    { label: 'Search', onClick: onCommit },
  ];

  return (
    <EditForm>
      <TodoSearchFormTagsField
        categoryTags={categoryTags}
        tags={todoSearchFormValue.tags}
        onToggleTag={onToggleTag}
      />
      <TodoSearchFormStatusField
        status={todoSearchFormValue.status}
        onSelectStatus={onSelectStatus}
      />
      <TodoSearchFormCheckpointField
        checkpoint={todoSearchFormValue.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoSearchFormCategoryField
        categories={categories}
        category={todoSearchFormValue.category}
        onSelectCategory={onSelectCategory}
      />
      <TodoSearchFormTextField
        text={todoSearchFormValue.text}
        onChangeText={onChangeText}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
