import { DateTime } from '../../view_models/DateTime';
import { getSelectedIds, Selection } from '../../view_models/Selection';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import {
  CheckpointEditFormValues,
  getCheckpointEditFormValues,
} from '../view_models/CheckpointEditFormValues';

export type CheckpointEditFormState = CheckpointEditFormValues;

enum CheckpointEditFormActionType {
  OPEN = 'checkpointEditForm/OPEN',
  RESET = 'checkpointEditForm/RESET',
  SET = 'checkpointEditForm/SET',
  TOGGLE_TAG = 'checkpointEditForm/TOGGLE_TAG',
}

export type CheckpointEditFormAction =
  | {
      type: CheckpointEditFormActionType.RESET;
    }
  | {
      payload: { state: Partial<CheckpointEditFormState> };
      type: CheckpointEditFormActionType.SET;
    }
  | {
      payload: {
        checkpoints: RootCheckpointFragment[];
        now: DateTime;
        selection: Selection;
      };
      type: CheckpointEditFormActionType.OPEN;
    };

export function checkpointEditFormReset(): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.RESET,
  };
}

export function checkpointEditFormOpen(
  checkpoints: RootCheckpointFragment[],
  selection: Selection,
  now: DateTime
): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.OPEN,
    payload: { checkpoints, selection, now },
  };
}

export function checkpointEditFormSet(
  state: Partial<CheckpointEditFormState>
): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.SET,
    payload: { state },
  };
}

export const checkpointEditFormInitialState: CheckpointEditFormState = {
  endAt: null,
  name: '',
};

export function checkpointEditFormReducer(
  state: CheckpointEditFormState = checkpointEditFormInitialState,
  action: CheckpointEditFormAction
): CheckpointEditFormState {
  switch (action.type) {
    case CheckpointEditFormActionType.RESET: {
      return checkpointEditFormInitialState;
    }
    case CheckpointEditFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case CheckpointEditFormActionType.OPEN: {
      const { checkpoints, now, selection } = action.payload;

      const selectedTodoIds = getSelectedIds(selection);
      const count = selectedTodoIds.length;
      if (count === 1) {
        const todoId = selectedTodoIds[0];
        const todo = checkpoints.find((todo) => todo.id === todoId);
        return todo
          ? getCheckpointEditFormValues(todo)
          : checkpointEditFormInitialState;
      }
      if (count === 0) {
        return {
          ...checkpointEditFormInitialState,
          endAt: now,
        };
      }
      return checkpointEditFormInitialState;
    }
    default: {
      return state;
    }
  }
}
