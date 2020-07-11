import { combineReducers } from 'redux';

import {
  categoryEditFormReducer,
  CategoryEditFormState,
} from './CategoryEditFormDucks';
import {
  checkpointEditFormReducer,
  CheckpointEditFormState,
} from './CheckpointEditFormStateDucks';
import { tagEditFormReducer, TagEditFormState } from './TagEditFormDucks';
import { todoEditFormReducer, TodoEditFormState } from './TodoEditFormDucks';

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
