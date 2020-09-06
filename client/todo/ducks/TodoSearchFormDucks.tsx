import { TodoSearchFormValues } from '../view_models/TodoSearchFormValues';

export type TodoSearchFormState = TodoSearchFormValues;

enum TodoSearchFormActionType {
  RESET = 'todoSearchForm/RESET',
  SET = 'todoSearchForm/SET',
}

export type TodoSearchFormAction =
  | {
      type: TodoSearchFormActionType.RESET;
    }
  | {
      payload: { state: Partial<TodoSearchFormValues> };
      type: TodoSearchFormActionType.SET;
    };

export function todoSearchFormReset(): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.RESET,
  };
}

export function todoSearchFormSet(
  state: Partial<TodoSearchFormValues>
): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.SET,
    payload: { state },
  };
}

export const todoSearchFormInitialState: TodoSearchFormState = {
  archivedAt: null,
  category: null,
  checkpoint: null,
  parentId: undefined,
  status: null,
  tags: null,
  text: '',
};

export function todoSearchFormReducer(
  state: TodoSearchFormState = todoSearchFormInitialState,
  action: TodoSearchFormAction
): TodoSearchFormState {
  switch (action.type) {
    case TodoSearchFormActionType.RESET: {
      return todoSearchFormInitialState;
    }
    case TodoSearchFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    default: {
      return state;
    }
  }
}
