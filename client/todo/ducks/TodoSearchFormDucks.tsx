import { EMPTY } from '../../shared/constants/EMPTY';
import { toggleWith } from '../../shared/helpers/toggle';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';
import { TodoSearchFormValues } from '../view_models/TodoSearchFormValues';

export type TodoSearchFormState = TodoSearchFormValues;

enum TodoSearchFormActionType {
  RESET = 'todoSearchForm/RESET',
  SET = 'todoSearchForm/SET',
  TOGGLE_TAG = 'todoSearchForm/TOGGLE_TAG',
}

export type TodoSearchFormAction =
  | {
      type: TodoSearchFormActionType.RESET;
    }
  | {
      payload: { state: Partial<TodoSearchFormState> };
      type: TodoSearchFormActionType.SET;
    }
  | {
      payload: { tag: TodoTagFragment };
      type: TodoSearchFormActionType.TOGGLE_TAG;
    };

export function todoSearchFormReset(): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.RESET,
  };
}

export function todoSearchFormToggleTag(
  tag: TodoTagFragment
): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.TOGGLE_TAG,
    payload: { tag },
  };
}

export function todoSearchFormSet(
  state: Partial<TodoSearchFormState>
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
    case TodoSearchFormActionType.TOGGLE_TAG: {
      const { tag } = action.payload;
      const oldTags = state.tags ?? EMPTY;
      const newTags = toggleWith(oldTags, tag, (t) => t.id);
      return {
        ...state,
        tags: newTags,
      };
    }
    default: {
      return state;
    }
  }
}
