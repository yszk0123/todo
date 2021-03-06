import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { Color } from '../../shared/graphql/__generated__/baseTypes';
import { first } from '../../shared/helpers/first';
import { toggle } from '../../shared/helpers/toggle';
import { ID } from '../../view_models/ID';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';

export type TagEditFormState = {
  color: Color;
  name: string;
  parent: RootTagFragment | null;
  selectedTagIds: ID[];
  tagCategories: RootCategoryFragment[];
};

enum TagEditFormActionType {
  RESET = 'tagEditForm/RESET',
  SELECT = 'tagEditForm/SELECT',
  SELECT_MANY = 'tagEditForm/SELECT_MANY',
  SELECT_ONE = 'tagEditForm/SELECT_ONE',
  SET = 'tagEditForm/SET',
}

export type TagEditFormAction =
  | {
      type: TagEditFormActionType.RESET;
    }
  | {
      payload: { state: Partial<TagEditFormState> };
      type: TagEditFormActionType.SET;
    }
  | {
      payload: { tag: RootTagFragment };
      type: TagEditFormActionType.SELECT;
    }
  | {
      payload: { tag: RootTagFragment };
      type: TagEditFormActionType.SELECT_ONE;
    }
  | {
      payload: { tag: RootTagFragment };
      type: TagEditFormActionType.SELECT_MANY;
    };

export function tagEditFormReset(): TagEditFormAction {
  return {
    type: TagEditFormActionType.RESET,
  };
}

export function tagEditFormSelectOne(tag: RootTagFragment): TagEditFormAction {
  return {
    type: TagEditFormActionType.SELECT_ONE,
    payload: { tag },
  };
}

export function tagEditFormSelectMany(tag: RootTagFragment): TagEditFormAction {
  return {
    type: TagEditFormActionType.SELECT_MANY,
    payload: { tag },
  };
}

export function tagEditFormSet(
  state: Partial<TagEditFormState>
): TagEditFormAction {
  return {
    type: TagEditFormActionType.SET,
    payload: { state },
  };
}

export const tagEditFormInitialState: TagEditFormState = {
  tagCategories: [],
  selectedTagIds: [],
  parent: null,
  color: Color.Default,
  name: '',
};

export function tagEditFormReducer(
  state: TagEditFormState = tagEditFormInitialState,
  action: TagEditFormAction
): TagEditFormState {
  switch (action.type) {
    case TagEditFormActionType.RESET: {
      return tagEditFormInitialState;
    }
    case TagEditFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case TagEditFormActionType.SELECT_ONE: {
      const { selectedTagIds } = state;
      const { tag } = action.payload;

      const isMatch =
        selectedTagIds.length === 1 && first(selectedTagIds) === tag.id;
      if (isMatch) {
        return tagEditFormInitialState;
      }

      return {
        ...state,
        selectedTagIds: [tag.id],
        color: tag.color,
        name: tag.name ?? null,
        tagCategories: tag.categories,
      };
    }
    case TagEditFormActionType.SELECT_MANY: {
      const { selectedTagIds } = state;
      const { tag } = action.payload;

      const newSelectedTodoIds = toggle(selectedTagIds, tag.id);
      const isSingle = newSelectedTodoIds.length === 1;
      if (isSingle) {
        return {
          ...state,
          selectedTagIds: newSelectedTodoIds,
          color: tag.color,
          name: tag.name ?? null,
          tagCategories: tag.categories,
        };
      } else {
        return {
          ...tagEditFormInitialState,
          selectedTagIds: newSelectedTodoIds,
        };
      }
    }
    default: {
      return state;
    }
  }
}
