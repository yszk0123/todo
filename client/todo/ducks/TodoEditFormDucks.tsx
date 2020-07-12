import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { first } from '../../shared/helpers/first';
import { toggle, toggleWith } from '../../shared/helpers/toggle';
import { ID } from '../../view_models/ID';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';

export type TodoEditFormState = {
  category: RootCategoryFragment | null;
  checkpoint: RootCheckpointFragment | null;
  selectedTodoIds: ID[];
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
};

enum TodoEditFormActionType {
  RESET = 'todoEditForm/RESET',
  SELECT = 'todoEditForm/SELECT',
  SELECT_MANY = 'todoEditForm/SELECT_MANY',
  SELECT_ONE = 'todoEditForm/SELECT_ONE',
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
      payload: { todo: RootTodoFragment };
      type: TodoEditFormActionType.SELECT;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoEditFormActionType.SELECT_ONE;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoEditFormActionType.SELECT_MANY;
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

export function todoEditFormSelectOne(
  todo: RootTodoFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_ONE,
    payload: { todo },
  };
}

export function todoEditFormSelectMany(
  todo: RootTodoFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_MANY,
    payload: { todo },
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

export function todoEditFormSet(
  state: Partial<TodoEditFormState>
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SET,
    payload: { state },
  };
}

export const todoEditFormInitialState: TodoEditFormState = {
  category: null,
  checkpoint: null,
  selectedTodoIds: [],
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
    case TodoEditFormActionType.SELECT_ONE: {
      const { selectedTodoIds } = state;
      const { todo } = action.payload;

      const isMatch =
        selectedTodoIds.length === 1 && first(selectedTodoIds) === todo.id;
      if (isMatch) {
        return todoEditFormInitialState;
      }

      return {
        ...state,
        category: todo.category,
        checkpoint: todo.checkpoint ?? null,
        selectedTodoIds: [todo.id],
        status: todo.status,
        tags: todo.tags,
        text: todo.text,
      };
    }
    case TodoEditFormActionType.SELECT_MANY: {
      const { selectedTodoIds } = state;
      const { todo } = action.payload;

      const newSelectedTodoIds = toggle(selectedTodoIds, todo.id);
      const isSingle = newSelectedTodoIds.length === 1;
      if (isSingle) {
        return {
          ...state,
          category: todo.category,
          checkpoint: todo.checkpoint ?? null,
          selectedTodoIds: newSelectedTodoIds,
          status: todo.status,
          tags: todo.tags,
          text: todo.text,
        };
      } else {
        return {
          ...state,
          category: null,
          checkpoint: null,
          selectedTodoIds: newSelectedTodoIds,
          status: null,
          tags: null,
          text: '',
        };
      }
    }
    case TodoEditFormActionType.TOGGLE_TAG: {
      const { tag } = action.payload;
      const oldTags = state.tags ?? [];
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
