import { combineReducers } from 'redux';

import {
  categoryEditFormReducer,
  CategoryEditFormState,
} from './CategoryEditFormState';
import { tagEditFormReducer, TagEditFormState } from './TagEditFormState';
import { todoEditFormReducer, TodoEditFormState } from './TodoEditFormState';

export type RootState = {
  categoryEditForm: CategoryEditFormState;
  tagEditForm: TagEditFormState;
  todoEditForm: TodoEditFormState;
};

export const rootReducer = combineReducers<RootState>({
  categoryEditForm: categoryEditFormReducer,
  tagEditForm: tagEditFormReducer,
  todoEditForm: todoEditFormReducer,
});
