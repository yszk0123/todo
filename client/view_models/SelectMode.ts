import { Selection, SelectionType } from './Selection';

export enum SelectMode {
  NONE,
  SINGLE,
  MULTI,
}

export function isSelected(selectMode: SelectMode): boolean {
  return selectMode !== SelectMode.NONE;
}

export function getSelectMode<T>(items: T[]): SelectMode {
  const count = items.length;
  return count === 0
    ? SelectMode.NONE
    : count === 1
    ? SelectMode.SINGLE
    : SelectMode.MULTI;
}

export function getSelectModeFromSelection(selection: Selection): SelectMode {
  switch (selection.type) {
    case SelectionType.EXPAND: {
      return SelectMode.NONE;
    }
    case SelectionType.SELECT: {
      const count = selection.ids.length;
      return count === 0
        ? SelectMode.NONE
        : count === 1
        ? SelectMode.SINGLE
        : SelectMode.MULTI;
    }
  }
}
