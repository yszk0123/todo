import { toggle } from '../../shared/helpers/toggle';
import {
  createSelection,
  getSelectedIds,
  Selection,
  SelectionType,
} from '../../view_models/Selection';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';

export type TodoSelectionState = Selection;

enum TodoSelectionActionType {
  DESELECT = 'todoSelection/DESELECT',
  EXPAND = 'todoSelection/EXPAND',
  RESET = 'todoSelection/RESET',
  SELECT = 'todoSelection/SELECT',
  SELECT_BY_CATEGORY = 'todoSelection/SELECT_BY_CATEGORY',
  SELECT_BY_TAG = 'todoSelection/SELECT_BY_TAG',
  SELECT_MANY = 'todoSelection/SELECT_MANY',
  SET = 'todoSelection/SET',
}

export type TodoSelectionAction =
  | {
      type: TodoSelectionActionType.DESELECT;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoSelectionActionType.EXPAND;
    }
  | {
      payload: { state: TodoSelectionState };
      type: TodoSelectionActionType.SET;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoSelectionActionType.SELECT;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoSelectionActionType.SELECT_MANY;
    }
  | {
      payload: { tag: TodoTagFragment; todos: RootTodoFragment[] };
      type: TodoSelectionActionType.SELECT_BY_TAG;
    }
  | {
      payload: { category: TodoCategoryFragment; todos: RootTodoFragment[] };
      type: TodoSelectionActionType.SELECT_BY_CATEGORY;
    };

export function todoSelectionDeselect(): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.DESELECT,
  };
}

export function todoSelectionExpandTodo(
  todo: RootTodoFragment
): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.EXPAND,
    payload: { todo },
  };
}

export function todoSelectionSelectMany(
  todo: RootTodoFragment
): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.SELECT_MANY,
    payload: { todo },
  };
}

export function todoSelectionSelectByTag(
  todos: RootTodoFragment[],
  tag: TodoTagFragment
): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.SELECT_BY_TAG,
    payload: { todos, tag },
  };
}

export function todoSelectionSelectByCategory(
  todos: RootTodoFragment[],
  category: TodoCategoryFragment
): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.SELECT_BY_CATEGORY,
    payload: { todos, category },
  };
}

export function todoSelectionSet(
  state: TodoSelectionState
): TodoSelectionAction {
  return {
    type: TodoSelectionActionType.SET,
    payload: { state },
  };
}

export const todoSelectionInitialState: TodoSelectionState = {
  type: SelectionType.NONE,
};

export function todoSelectionReducer(
  state: TodoSelectionState = todoSelectionInitialState,
  action: TodoSelectionAction
): TodoSelectionState {
  switch (action.type) {
    case TodoSelectionActionType.DESELECT: {
      return { type: SelectionType.NONE };
    }
    case TodoSelectionActionType.SET: {
      return action.payload.state;
    }
    case TodoSelectionActionType.EXPAND: {
      const todo = action.payload.todo;
      return {
        type: SelectionType.EXPAND,
        id: todo.id,
      };
    }
    case TodoSelectionActionType.SELECT_MANY: {
      const { todo } = action.payload;
      const selectedTodoIds = getSelectedIds(state);
      return {
        type: SelectionType.SELECT,
        ids: toggle(selectedTodoIds, todo.id),
      };
    }
    case TodoSelectionActionType.SELECT_BY_TAG: {
      const { tag, todos } = action.payload;

      const todoIds = todos
        .filter((todo) => todo.tags.includes(tag))
        .map((todo) => todo.id);
      return createSelection(todoIds);
    }
    case TodoSelectionActionType.SELECT_BY_CATEGORY: {
      const { category, todos } = action.payload;

      const todoIds = todos
        .filter((todo) => todo.category === category)
        .map((todo) => todo.id);
      return createSelection(todoIds);
    }
    default: {
      return state;
    }
  }
}
