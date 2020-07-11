import { combineReducers } from 'redux';

import { todoEditFormReducer } from './TodoEditFormState';

export const rootReducer = combineReducers({
  todoEditForm: todoEditFormReducer,
});
