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
import {
  todoSearchFormReducer,
  TodoSearchFormState,
} from '../../todo/ducks/TodoSearchFormDucks';
import {
  todoSelectionReducer,
  TodoSelectionState,
} from '../../todo/ducks/TodoSelectionDucks';

export type RootState = {
  categoryEditForm: CategoryEditFormState;
  checkpointEditForm: CheckpointEditFormState;
  tagEditForm: TagEditFormState;
  todoEditFormValues: TodoEditFormState;
  todoSearchForm: TodoSearchFormState;
  todoSelection: TodoSelectionState;
};

export const rootReducer = combineReducers<RootState>({
  checkpointEditForm: checkpointEditFormReducer,
  categoryEditForm: categoryEditFormReducer,
  tagEditForm: tagEditFormReducer,
  todoEditFormValues: todoEditFormReducer,
  todoSelection: todoSelectionReducer,
  todoSearchForm: todoSearchFormReducer,
});
