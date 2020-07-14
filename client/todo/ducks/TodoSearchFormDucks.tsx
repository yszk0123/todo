import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { toggleWith } from '../../shared/helpers/toggle';
import { DateTime } from '../../view_models/DateTime';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../view_models/TodoSearchQuery';

function parseTodoSearchFormValue(
  value: TodoSearchFormValue | null
): TodoSearchQuery {
  const archivedAt = value?.archivedAt ?? null;
  const categoryId = value?.category?.id ?? null;
  const checkpointId = value?.checkpoint?.id ?? null;
  const status = value?.status ?? null;
  const tagIds = value?.tags?.map((tag) => tag.id) ?? null;
  const text = value?.text ?? null;
  return {
    archivedAt,
    categoryId,
    checkpointId,
    status,
    tagIds,
    text,
  };
}

export type TodoSearchFormValue = {
  archivedAt: DateTime | null;
  category: RootCategoryFragment | null;
  checkpoint: RootCheckpointFragment | null;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
};

export type TodoSearchFormState = {
  current: TodoSearchQuery | null;
  draft: TodoSearchFormValue;
};

enum TodoSearchFormActionType {
  COMMIT = 'todoSearchForm/COMMIT',
  RESET = 'todoSearchForm/RESET',
  SET = 'todoSearchForm/SET',
  TOGGLE_TAG = 'todoSearchForm/TOGGLE_TAG',
}

export type TodoSearchFormAction =
  | {
      type: TodoSearchFormActionType.RESET;
    }
  | {
      payload: { draft: Partial<TodoSearchFormValue> };
      type: TodoSearchFormActionType.SET;
    }
  | {
      type: TodoSearchFormActionType.COMMIT;
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
  draft: Partial<TodoSearchFormValue>
): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.SET,
    payload: { draft },
  };
}

export function todoSearchFormCommit(): TodoSearchFormAction {
  return {
    type: TodoSearchFormActionType.COMMIT,
  };
}

export const todoSearchFormInitialState: TodoSearchFormState = {
  current: null,
  draft: {
    archivedAt: null,
    category: null,
    checkpoint: null,
    status: null,
    tags: null,
    text: '',
  },
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
        draft: {
          ...state.draft,
          ...action.payload.draft,
        },
      };
    }
    case TodoSearchFormActionType.COMMIT: {
      const current = parseTodoSearchFormValue(state.draft);
      return {
        ...state,
        current,
      };
    }
    case TodoSearchFormActionType.TOGGLE_TAG: {
      const { tag } = action.payload;
      const oldTags = state.draft.tags ?? [];
      const newTags = toggleWith(oldTags, tag, (t) => t.id);
      return {
        ...state,
        draft: {
          ...state.draft,
          tags: newTags,
        },
      };
    }
    default: {
      return state;
    }
  }
}
