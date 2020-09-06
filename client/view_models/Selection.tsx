import { EMPTY } from '../shared/constants/EMPTY';
import { ID } from './ID';

export enum SelectionType {
  EXPAND = 'EXPAND',
  SELECT = 'SELECT',
}

export type Selection =
  | {
      id: ID;
      type: SelectionType.EXPAND;
    }
  | {
      ids: ID[];
      type: SelectionType.SELECT;
    };

export function getSelectedIds(selection: Selection): ID[] {
  return selection.type === SelectionType.SELECT ? selection.ids : EMPTY;
}

export function getSelected<T>(
  items: T[],
  selection: Selection,
  getId: (item: T) => ID
): T[] {
  const ids = getSelectedIds(selection);
  return items.filter((item) => ids.includes(getId(item)));
}

export function getSelectedCount(selection: Selection): number {
  return selection.type === SelectionType.SELECT ? selection.ids.length : 0;
}

export function isSelected(selection: Selection, todoId: ID): boolean {
  return (
    selection.type === SelectionType.SELECT && selection.ids.includes(todoId)
  );
}

export function isSelectedSome(selection: Selection): boolean {
  return selection.type === SelectionType.SELECT && selection.ids.length > 0;
}

export function isExpanded(selection: Selection, todoId: ID): boolean {
  return selection.type === SelectionType.EXPAND && selection.id === todoId;
}
