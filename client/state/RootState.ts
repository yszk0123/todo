import { combineReducers } from 'redux';

import {
  categoryEditFormReducer,
  CategoryEditFormState,
} from './CategoryEditFormState';
import {
  checkpointEditFormReducer,
  CheckpointEditFormState,
} from './CheckpointEditFormState';
import { tagEditFormReducer, TagEditFormState } from './TagEditFormState';
import { todoEditFormReducer, TodoEditFormState } from './TodoEditFormState';

export type RootState = {
  categoryEditForm: CategoryEditFormState;
  checkpointEditForm: CheckpointEditFormState;
  tagEditForm: TagEditFormState;
  todoEditForm: TodoEditFormState;
};

export const rootReducer = combineReducers<RootState>({
  checkpointEditForm: checkpointEditFormReducer,
  categoryEditForm: categoryEditFormReducer,
  tagEditForm: tagEditFormReducer,
  todoEditForm: todoEditFormReducer,
});
