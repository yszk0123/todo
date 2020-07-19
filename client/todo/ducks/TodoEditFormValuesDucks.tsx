import { EMPTY } from '../../shared/constants/EMPTY';
import { toggleWith } from '../../shared/helpers/toggle';
import { getSelectedIds, Selection } from '../../view_models/TodoSelection';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import {
  getTodoEditFormValues,
  TodoEditFormValues,
} from '../view_models/TodoEditFormValues';

export type TodoEditFormValuesState = TodoEditFormValues;

enum TodoEditFormValuesActionType {
  OPEN = 'todoEditFormValues/OPEN',
  RESET = 'todoEditFormValues/RESET',
  SET = 'todoEditFormValues/SET',
  TOGGLE_TAG = 'todoEditFormValues/TOGGLE_TAG',
}

export type TodoEditFormValuesAction =
  | {
      type: TodoEditFormValuesActionType.RESET;
    }
  | {
      payload: { state: Partial<TodoEditFormValuesState> };
      type: TodoEditFormValuesActionType.SET;
    }
  | {
      payload: { selection: Selection; todos: RootTodoFragment[] };
      type: TodoEditFormValuesActionType.OPEN;
    }
  | {
      payload: { tag: TodoTagFragment };
      type: TodoEditFormValuesActionType.TOGGLE_TAG;
    };

export function todoEditFormValuesReset(): TodoEditFormValuesAction {
  return {
    type: TodoEditFormValuesActionType.RESET,
  };
}

export function todoEditFormValuesOpen(
  todos: RootTodoFragment[],
  selection: Selection
): TodoEditFormValuesAction {
  return {
    type: TodoEditFormValuesActionType.OPEN,
    payload: { todos, selection },
  };
}

export function todoEditFormValuesSet(
  state: Partial<TodoEditFormValuesState>
): TodoEditFormValuesAction {
  return {
    type: TodoEditFormValuesActionType.SET,
    payload: { state },
  };
}

export function todoEditFormValuesToggleTag(
  tag: TodoTagFragment
): TodoEditFormValuesAction {
  return {
    type: TodoEditFormValuesActionType.TOGGLE_TAG,
    payload: { tag },
  };
}

export const todoEditFormValuesInitialState: TodoEditFormValuesState = {
  category: null,
  checkpoint: null,
  status: null,
  tags: null,
  text: '',
};

export function todoEditFormValuesReducer(
  state: TodoEditFormValuesState = todoEditFormValuesInitialState,
  action: TodoEditFormValuesAction
): TodoEditFormValuesState {
  switch (action.type) {
    case TodoEditFormValuesActionType.RESET: {
      return todoEditFormValuesInitialState;
    }
    case TodoEditFormValuesActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case TodoEditFormValuesActionType.OPEN: {
      const { selection, todos } = action.payload;

      const selectedTodoIds = getSelectedIds(selection);
      if (selectedTodoIds.length === 1) {
        const todoId = selectedTodoIds[0];
        const todo = todos.find((todo) => todo.id === todoId);
        return todo
          ? getTodoEditFormValues(todo)
          : todoEditFormValuesInitialState;
      } else {
        return todoEditFormValuesInitialState;
      }
    }
    case TodoEditFormValuesActionType.TOGGLE_TAG: {
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
