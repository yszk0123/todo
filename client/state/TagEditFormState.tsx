import { first } from '../components/helpers/first';
import { Color } from '../graphql/__generated__/baseTypes';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { ID } from '../viewModels/ID';

export type TagEditFormState = {
  color: Color;
  name: string;
  selectedTagIds: ID[];
  tagCategories: RootCategoryFragment[];
};

enum TagEditFormActionType {
  RESET = 'RESET',
  SELECT = 'SELECT',
  SELECT_MANY = 'SELECT_MANY',
  SELECT_ONE = 'SELECT_ONE',
  SET = 'SET',
  TOGGLE_CATEGORY = 'TOGGLE_CATEGORY',
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
      payload: { category: RootCategoryFragment };
      type: TagEditFormActionType.TOGGLE_CATEGORY;
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

export function tagEditFormToggleCategory(
  category: RootCategoryFragment
): TagEditFormAction {
  return {
    type: TagEditFormActionType.TOGGLE_CATEGORY,
    payload: { category },
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
  color: Color.Default,
  name: '',
};

export function tagEditFormReducer(
  state: TagEditFormState,
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

      const isSelected = !!selectedTagIds.includes(tag.id);
      const newSelectedTodoIds = isSelected
        ? selectedTagIds.filter((id) => id !== tag.id)
        : [...selectedTagIds, tag.id];
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
    case TagEditFormActionType.TOGGLE_CATEGORY: {
      const { tagCategories } = state;
      const { category } = action.payload;
      const has = tagCategories.find((t) => t.id === category.id);
      const newCategories = has
        ? tagCategories.filter((t) => t.id !== category.id)
        : [...tagCategories, category];
      return {
        ...state,
        tagCategories: newCategories,
      };
    }
    default: {
      return state;
    }
  }
}
