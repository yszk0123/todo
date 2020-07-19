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
