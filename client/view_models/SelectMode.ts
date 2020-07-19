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
  return selection.type === SelectionType.NONE ||
    selection.type === SelectionType.EXPAND
    ? SelectMode.NONE
    : selection.ids.length === 1
    ? SelectMode.SINGLE
    : SelectMode.MULTI;
}
