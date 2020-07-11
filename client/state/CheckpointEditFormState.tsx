import { first } from '../components/helpers/first';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { DateTime } from '../viewModels/DateTime';
import { ID } from '../viewModels/ID';

export type CheckpointEditFormState = {
  checkpoint: RootCheckpointFragment | null;
  endAt: DateTime | null;
  name: string | null;
  selectedCheckpointIds: ID[];
};

enum CheckpointEditFormActionType {
  RESET = 'checkpointEditForm/RESET',
  SELECT = 'checkpointEditForm/SELECT',
  SELECT_MANY = 'checkpointEditForm/SELECT_MANY',
  SELECT_ONE = 'checkpointEditForm/SELECT_ONE',
  SET = 'checkpointEditForm/SET',
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
      payload: { checkpoint: RootCheckpointFragment };
      type: CheckpointEditFormActionType.SELECT;
    }
  | {
      payload: { checkpoint: RootCheckpointFragment };
      type: CheckpointEditFormActionType.SELECT_ONE;
    }
  | {
      payload: { checkpoint: RootCheckpointFragment };
      type: CheckpointEditFormActionType.SELECT_MANY;
    };

export function checkpointEditFormReset(): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.RESET,
  };
}

export function checkpointEditFormSelectOne(
  checkpoint: RootCheckpointFragment
): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.SELECT_ONE,
    payload: { checkpoint },
  };
}

export function checkpointEditFormSelectMany(
  checkpoint: RootCheckpointFragment
): CheckpointEditFormAction {
  return {
    type: CheckpointEditFormActionType.SELECT_MANY,
    payload: { checkpoint },
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
  checkpoint: null,
  selectedCheckpointIds: [],
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
    case CheckpointEditFormActionType.SELECT_ONE: {
      const { selectedCheckpointIds } = state;
      const { checkpoint } = action.payload;

      const isMatch =
        selectedCheckpointIds.length === 1 &&
        first(selectedCheckpointIds) === checkpoint.id;
      if (isMatch) {
        return checkpointEditFormInitialState;
      }

      return {
        ...state,
        selectedCheckpointIds: [checkpoint.id],
        endAt: checkpoint.endAt,
        name: checkpoint.name ?? null,
      };
    }
    case CheckpointEditFormActionType.SELECT_MANY: {
      const { selectedCheckpointIds } = state;
      const { checkpoint } = action.payload;

      const isSelected = !!selectedCheckpointIds.includes(checkpoint.id);
      const newSelectedTodoIds = isSelected
        ? selectedCheckpointIds.filter((id) => id !== checkpoint.id)
        : [...selectedCheckpointIds, checkpoint.id];
      const isSingle = newSelectedTodoIds.length === 1;
      if (isSingle) {
        return {
          ...state,
          selectedCheckpointIds: newSelectedTodoIds,
          endAt: checkpoint.endAt,
          name: checkpoint.name ?? null,
        };
      } else {
        return {
          ...state,
          checkpoint: null,
          selectedCheckpointIds: newSelectedTodoIds,
          endAt: null,
          name: '',
        };
      }
    }
    default: {
      return state;
    }
  }
}
