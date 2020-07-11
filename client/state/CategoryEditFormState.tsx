import { first } from '../components/helpers/first';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { ID } from '../viewModels/ID';

export type CategoryEditFormState = {
  category: RootCategoryFragment | null;
  name: string;
  selectedCategoryIds: ID[];
};

enum CategoryEditFormActionType {
  RESET = 'RESET',
  SELECT = 'SELECT',
  SELECT_MANY = 'SELECT_MANY',
  SELECT_ONE = 'SELECT_ONE',
  SET = 'SET',
}

export type CategoryEditFormAction =
  | {
      type: CategoryEditFormActionType.RESET;
    }
  | {
      payload: { state: Partial<CategoryEditFormState> };
      type: CategoryEditFormActionType.SET;
    }
  | {
      payload: { category: RootCategoryFragment };
      type: CategoryEditFormActionType.SELECT;
    }
  | {
      payload: { category: RootCategoryFragment };
      type: CategoryEditFormActionType.SELECT_ONE;
    }
  | {
      payload: { category: RootCategoryFragment };
      type: CategoryEditFormActionType.SELECT_MANY;
    };

export function categoryEditFormReset(): CategoryEditFormAction {
  return {
    type: CategoryEditFormActionType.RESET,
  };
}

export function categoryEditFormSelectOne(
  category: RootCategoryFragment
): CategoryEditFormAction {
  return {
    type: CategoryEditFormActionType.SELECT_ONE,
    payload: { category },
  };
}

export function categoryEditFormSelectMany(
  category: RootCategoryFragment
): CategoryEditFormAction {
  return {
    type: CategoryEditFormActionType.SELECT_MANY,
    payload: { category },
  };
}

export function categoryEditFormSet(
  state: Partial<CategoryEditFormState>
): CategoryEditFormAction {
  return {
    type: CategoryEditFormActionType.SET,
    payload: { state },
  };
}

export const categoryEditFormInitialState: CategoryEditFormState = {
  category: null,
  selectedCategoryIds: [],
  name: '',
};

export function categoryEditFormReducer(
  state: CategoryEditFormState = categoryEditFormInitialState,
  action: CategoryEditFormAction
): CategoryEditFormState {
  switch (action.type) {
    case CategoryEditFormActionType.RESET: {
      return categoryEditFormInitialState;
    }
    case CategoryEditFormActionType.SET: {
      return {
        ...state,
        ...action.payload.state,
      };
    }
    case CategoryEditFormActionType.SELECT_ONE: {
      const { selectedCategoryIds } = state;
      const { category } = action.payload;

      const isMatch =
        selectedCategoryIds.length === 1 &&
        first(selectedCategoryIds) === category.id;
      if (isMatch) {
        return categoryEditFormInitialState;
      }

      return {
        ...state,
        selectedCategoryIds: [category.id],
        name: category.name ?? null,
      };
    }
    case CategoryEditFormActionType.SELECT_MANY: {
      const { selectedCategoryIds } = state;
      const { category } = action.payload;

      const isSelected = !!selectedCategoryIds.includes(category.id);
      const newSelectedTodoIds = isSelected
        ? selectedCategoryIds.filter((id) => id !== category.id)
        : [...selectedCategoryIds, category.id];
      const isSingle = newSelectedTodoIds.length === 1;
      if (isSingle) {
        return {
          ...state,
          selectedCategoryIds: newSelectedTodoIds,
          name: category.name ?? null,
        };
      } else {
        return {
          ...state,
          category: null,
          selectedCategoryIds: newSelectedTodoIds,
          name: '',
        };
      }
    }
    default: {
      return state;
    }
  }
}
