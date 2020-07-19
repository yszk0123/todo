import { EMPTY } from '../../shared/constants/EMPTY';
import { toggleWith } from '../../shared/helpers/toggle';
import { getSelectedIds, Selection } from '../../view_models/Selection';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import {
  getTodoEditFormValues,
  TodoEditFormValues,
} from '../view_models/TodoEditFormValues';

export type TodoEditFormState = TodoEditFormValues;

enum TodoEditFormActionType {
  OPEN = 'todoEditForm/OPEN',
  RESET = 'todoEditForm/RESET',
  SET = 'todoEditForm/SET',
  TOGGLE_TAG = 'todoEditForm/TOGGLE_TAG',
}

export type TodoEditFormAction =
  | {
      type: TodoEditFormActionType.RESET;
    }
  | {
      payload: { state: Partial<TodoEditFormState> };
      type: TodoEditFormActionType.SET;
    }
  | {
      payload: { selection: Selection; todos: RootTodoFragment[] };
      type: TodoEditFormActionType.OPEN;
    }
  | {
      payload: { tag: TodoTagFragment };
      type: TodoEditFormActionType.TOGGLE_TAG;
    };

export function todoEditFormReset(): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.RESET,
  };
}

export function todoEditFormOpen(
  todos: RootTodoFragment[],
  selection: Selection
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.OPEN,
    payload: { todos, selection },
  };
}

export function todoEditFormSet(
  state: Partial<TodoEditFormState>
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SET,
    payload: { state },
  };
}

export function todoEditFormToggleTag(
  tag: TodoTagFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.TOGGLE_TAG,
    payload: { tag },
  };
}

export const todoEditFormInitialState: TodoEditFormState = {
  category: null,
  checkpoint: null,
  status: null,
  tags: null,
  text: '',
};

export function todoEditFormReducer(
  state: TodoEditFormState = todoEditFormInitialState,
  action: TodoEditFormAction
): TodoEditFormState {
  switch (action.type) {
    case TodoEditFormActionType.RESET: {
      return todoEditFormInitialState;
    }
    case TodoEditFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case TodoEditFormActionType.OPEN: {
      const { selection, todos } = action.payload;

      const selectedTodoIds = getSelectedIds(selection);
      if (selectedTodoIds.length === 1) {
        const todoId = selectedTodoIds[0];
        const todo = todos.find((todo) => todo.id === todoId);
        return todo ? getTodoEditFormValues(todo) : todoEditFormInitialState;
      } else {
        return todoEditFormInitialState;
      }
    }
    case TodoEditFormActionType.TOGGLE_TAG: {
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
