import { combineReducers } from 'redux';

import { tagEditFormReducer, TagEditFormState } from './TagEditFormState';
import { todoEditFormReducer, TodoEditFormState } from './TodoEditFormState';

export type RootState = {
  tagEditForm: TagEditFormState;
  todoEditForm: TodoEditFormState;
};

export const rootReducer = combineReducers<RootState>({
  todoEditForm: todoEditFormReducer,
  tagEditForm: tagEditFormReducer,
});
