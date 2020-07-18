import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { EMPTY } from '../../shared/constants/EMPTY';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { toggleWith } from '../../shared/helpers/toggle';
import { DateTime } from '../../view_models/DateTime';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';

export type TodoSearchFormState = {
  archivedAt: DateTime | null;
  category: RootCategoryFragment | null;
  checkpoint: RootCheckpointFragment | null;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
};

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
