import { EMPTY } from '../../shared/constants/EMPTY';
import { toggle } from '../../shared/helpers/toggle';
import {
  getSelectedIds,
  Selection,
  SelectionType,
} from '../../view_models/Selection';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';

export type CheckpointSelectionState = Selection;

enum CheckpointSelectionActionType {
  DESELECT = 'checkpointSelection/DESELECT',
  RESET = 'checkpointSelection/RESET',
  SELECT_MANY = 'checkpointSelection/SELECT_MANY',
  SET = 'checkpointSelection/SET',
}

export type CheckpointSelectionAction =
  | {
      type: CheckpointSelectionActionType.DESELECT;
    }
  | {
      payload: { state: CheckpointSelectionState };
      type: CheckpointSelectionActionType.SET;
    }
  | {
      payload: { todo: RootCheckpointFragment };
      type: CheckpointSelectionActionType.SELECT_MANY;
    };

export function checkpointSelectionDeselect(): CheckpointSelectionAction {
  return {
    type: CheckpointSelectionActionType.DESELECT,
  };
}

export function checkpointSelectionSelectMany(
  todo: RootCheckpointFragment
): CheckpointSelectionAction {
  return {
    type: CheckpointSelectionActionType.SELECT_MANY,
    payload: { todo },
  };
}

export function checkpointSelectionSet(
  state: CheckpointSelectionState
): CheckpointSelectionAction {
  return {
    type: CheckpointSelectionActionType.SET,
    payload: { state },
  };
}

export const checkpointSelectionInitialState: CheckpointSelectionState = {
  type: SelectionType.SELECT,
  ids: EMPTY,
};

export function checkpointSelectionReducer(
  state: CheckpointSelectionState = checkpointSelectionInitialState,
  action: CheckpointSelectionAction
): CheckpointSelectionState {
  switch (action.type) {
    case CheckpointSelectionActionType.DESELECT: {
      return { type: SelectionType.SELECT, ids: EMPTY };
    }
    case CheckpointSelectionActionType.SET: {
      return action.payload.state;
    }
    case CheckpointSelectionActionType.SELECT_MANY: {
      const { todo } = action.payload;
      const selectedTodoIds = getSelectedIds(state);
      return {
        type: SelectionType.SELECT,
        ids: toggle(selectedTodoIds, todo.id),
      };
    }
    default: {
      return state;
    }
  }
}
