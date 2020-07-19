import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { EMPTY } from '../../shared/constants/EMPTY';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { shallowEqual } from '../../shared/helpers/shallowEqual';
import { toggle, toggleWith } from '../../shared/helpers/toggle';
import {
  getSelectedIds,
  Selection,
  SelectionType,
} from '../../view_models/TodoSelection';
import {
  RootTodoFragment,
  TodoCategoryFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';

export type TodoEditFormState = {
  category: RootCategoryFragment | null;
  checkpoint: RootCheckpointFragment | null;
  selection: Selection;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
};

enum TodoEditFormActionType {
  DESELECT = 'todoEditForm/DESELECT',
  EXPAND = 'todoEditForm/EXPAND',
  RESET = 'todoEditForm/RESET',
  SELECT = 'todoEditForm/SELECT',
  SELECT_BY_CATEGORY = 'todoEditForm/SELECT_BY_CATEGORY',
  SELECT_BY_TAG = 'todoEditForm/SELECT_BY_TAG',
  SELECT_MANY = 'todoEditForm/SELECT_MANY',
  SET = 'todoEditForm/SET',
  TOGGLE_TAG = 'todoEditForm/TOGGLE_TAG',
}

export type TodoEditFormAction =
  | {
      type: TodoEditFormActionType.RESET;
    }
  | {
      type: TodoEditFormActionType.DESELECT;
    }
  | {
      payload: { todo: RootTodoFragment };
      type: TodoEditFormActionType.EXPAND;
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
      type: TodoEditFormActionType.SELECT_MANY;
    }
  | {
      payload: { tag: TodoTagFragment; todos: RootTodoFragment[] };
      type: TodoEditFormActionType.SELECT_BY_TAG;
    }
  | {
      payload: { category: TodoCategoryFragment; todos: RootTodoFragment[] };
      type: TodoEditFormActionType.SELECT_BY_CATEGORY;
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

export function todoEditFormDeselect(): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.DESELECT,
  };
}

export function todoEditFormExpandTodo(
  todo: RootTodoFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.EXPAND,
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

export function todoEditFormSelectByTag(
  todos: RootTodoFragment[],
  tag: TodoTagFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_BY_TAG,
    payload: { todos, tag },
  };
}

export function todoEditFormSelectByCategory(
  todos: RootTodoFragment[],
  category: TodoCategoryFragment
): TodoEditFormAction {
  return {
    type: TodoEditFormActionType.SELECT_BY_CATEGORY,
    payload: { todos, category },
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
  selection: { type: SelectionType.NONE },
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
    case TodoEditFormActionType.DESELECT: {
      return {
        ...state,
        selection: { type: SelectionType.NONE },
      };
    }
    case TodoEditFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case TodoEditFormActionType.EXPAND: {
      const todo = action.payload.todo;
      const newSelection: Selection = {
        type: SelectionType.EXPAND,
        id: todo.id,
      };
      return {
        ...state,
        selection: newSelection,
      };
    }
    case TodoEditFormActionType.SELECT_MANY: {
      const { selection } = state;
      const { todo } = action.payload;

      const selectedTodoIds = getSelectedIds(selection);
      const newSelection: Selection = {
        type: SelectionType.SELECT,
        ids: toggle(selectedTodoIds, todo.id),
      };
      const count = newSelection.ids.length;
      if (count === 1) {
        const newFields = getTodoEditFormFields(todo);
        return {
          ...state,
          ...newFields,
          selection: newSelection,
        };
      } else {
        return {
          ...todoEditFormInitialState,
          selection: newSelection,
        };
      }
    }
    case TodoEditFormActionType.SELECT_BY_TAG: {
      const { tag, todos } = action.payload;

      const selectedTodosByTag = todos.filter((todo) =>
        todo.tags.includes(tag)
      );
      return selectTodos(state, selectedTodosByTag);
    }
    case TodoEditFormActionType.SELECT_BY_CATEGORY: {
      const { category, todos } = action.payload;

      const selectedTodosByCategory = todos.filter(
        (todo) => todo.category === category
      );
      return selectTodos(state, selectedTodosByCategory);
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

function selectTodos(
  state: TodoEditFormState,
  newSelectedTodos: RootTodoFragment[]
): TodoEditFormState {
  const { selection } = state;
  const count = newSelectedTodos.length;
  if (count === 0) {
    return todoEditFormInitialState;
  }

  const selectedTodoIds = getSelectedIds(selection);
  const newSelectedTodoIds = newSelectedTodos.map((todo) => todo.id);
  const isIdentical = shallowEqual(selectedTodoIds, newSelectedTodoIds);
  if (isIdentical) {
    return todoEditFormInitialState;
  }

  const newSelection: Selection = {
    type: SelectionType.SELECT,
    ids: newSelectedTodoIds,
  };

  if (count === 1) {
    const todo = newSelectedTodos[0];
    const newFields = getTodoEditFormFields(todo);
    return {
      ...state,
      ...newFields,
      selection: newSelection,
    };
  } else {
    return {
      ...todoEditFormInitialState,
      selection: newSelection,
    };
  }
}

function getTodoEditFormFields(
  todo: RootTodoFragment
): Pick<
  TodoEditFormState,
  'category' | 'checkpoint' | 'status' | 'tags' | 'text'
> {
  return {
    category: todo.category,
    checkpoint: todo.checkpoint ?? null,
    status: todo.status,
    tags: todo.tags,
    text: todo.text,
  };
}
