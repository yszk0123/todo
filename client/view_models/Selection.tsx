import { EMPTY } from '../shared/constants/EMPTY';
import { ID } from './ID';

export enum SelectionType {
  EXPAND = 'EXPAND',
  NONE = 'NONE',
  SELECT = 'SELECT',
}

export type Selection =
  | { type: SelectionType.NONE }
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

export function createSelection(newIds: ID[]): Selection {
  return newIds.length === 0
    ? { type: SelectionType.NONE }
    : { type: SelectionType.SELECT, ids: newIds };
}
