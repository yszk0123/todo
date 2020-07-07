import { first } from '../components/pages/CategoryTodosPage/CategoryTodosPage';
import { TodoStatus } from '../graphql/__generated__/baseTypes';
import { CategoryTagFragment } from '../graphql/fragments/__generated__/CategoryTag.graphql';
import { CategoryTodoFragment } from '../graphql/fragments/__generated__/CategoryTodo.graphql';
import { RootCheckpointFragment } from '../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { ID } from '../viewModels/ID';

export type TodoEditFormState = {
  checkpoint: RootCheckpointFragment | null;
  selectedTodoIds: ID[];
  status: TodoStatus | null;
  tags: CategoryTagFragment[] | null;
  text: string;
};

enum TodoEditFormActionType {
  RESET = 'RESET',
  SELECT = 'SELECT',
  SELECT_MANY = 'SELECT_MANY',
  SELECT_ONE = 'SELECT_ONE',
  SET = 'SET',
  TOGGLE_TAG = 'TOGGLE_TAG',
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
      payload: { todo: CategoryTodoFragment };
      type: TodoEditFormActionType.SELECT;
    }
  | {
      payload: { todo: CategoryTodoFragment };
      type: TodoEditFormActionType.SELECT_ONE;
    }
  | {
      payload: { todo: CategoryTodoFragment };
      type: TodoEditFormActionType.SELECT_MANY;
    }
  | {
      payload: { tag: CategoryTagFragment };
      type: TodoEditFormActionType.TOGGLE_TAG;
    };

export function todoEditFormReset(): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.RESET,
  };
}

export function todoEditFormSelectOne(
  todo: CategoryTodoFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_ONE,
    payload: { todo },
  };
}

export function todoEditFormSelectMany(
  todo: CategoryTodoFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_MANY,
    payload: { todo },
  };
}

export function todoEditFormToggleTag(
  tag: CategoryTagFragment
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
  checkpoint: null,
  selectedTodoIds: [],
  status: null,
  tags: null,
  text: '',
};

export function todoEditFormReducer(
  state: TodoEditFormState,
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

      const isSelected = !!selectedTodoIds.includes(todo.id);
      const newSelectedTodoIds = isSelected
        ? selectedTodoIds.filter((id) => id !== todo.id)
        : [...selectedTodoIds, todo.id];
      const isSingle = newSelectedTodoIds.length === 1;
      if (isSingle) {
        return {
          ...state,
          checkpoint: todo.checkpoint ?? null,
          selectedTodoIds: newSelectedTodoIds,
          status: todo.status,
          tags: todo.tags,
          text: todo.text,
        };
      } else {
        return {
          ...state,
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
      const has = oldTags.find((t) => t.id === tag.id);
      const newTags = has
        ? oldTags.filter((t) => t.id !== tag.id)
        : [...oldTags, tag];
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