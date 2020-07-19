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
      payload: { checkpoints: RootCheckpointFragment[]; selection: Selection };
      type: CheckpointEditFormActionType.OPEN;
    };

export function checkpointEditFormReset(): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.RESET,
  };
}

export function checkpointEditFormOpen(
  checkpoints: RootCheckpointFragment[],
  selection: Selection
): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.OPEN,
    payload: { checkpoints, selection },
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
      const { checkpoints, selection } = action.payload;

      const selectedTodoIds = getSelectedIds(selection);
      if (selectedTodoIds.length === 1) {
        const todoId = selectedTodoIds[0];
        const todo = checkpoints.find((todo) => todo.id === todoId);
        return todo
          ? getCheckpointEditFormValues(todo)
          : checkpointEditFormInitialState;
      } else {
        return checkpointEditFormInitialState;
      }
    }
    default: {
      return state;
    }
  }
}
