import { combineReducers } from 'redux';

import {
  categoryEditFormReducer,
  CategoryEditFormState,
} from '../../category/ducks/CategoryEditFormDucks';
import {
  checkpointEditFormReducer,
  CheckpointEditFormState,
} from '../../checkpoint/ducks/CheckpointEditFormStateDucks';
import {
  tagEditFormReducer,
  TagEditFormState,
} from '../../tag/ducks/TagEditFormDucks';
import {
  todoEditFormReducer,
  TodoEditFormState,
} from '../../todo/ducks/TodoEditFormDucks';

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
