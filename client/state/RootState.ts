import { combineReducers } from 'redux';

import { todoEditFormReducer, TodoEditFormState } from './TodoEditFormState';

export type RootState = {
  todoEditForm: TodoEditFormState;
};

export const rootReducer = combineReducers<RootState>({
  todoEditForm: todoEditFormReducer,
});
