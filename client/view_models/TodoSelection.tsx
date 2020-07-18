import { EMPTY } from '../shared/constants/EMPTY';
import { ID } from './ID';

export enum TodoSelectionType {
  EXPAND = 'EXPAND',
  NONE = 'NONE',
  SELECT = 'SELECT',
}

export type TodoSelection =
  | { type: TodoSelectionType.NONE }
  | {
      expandedTodoId: ID;
      type: TodoSelectionType.EXPAND;
    }
  | {
      selectedTodoIds: ID[];
      type: TodoSelectionType.SELECT;
    };

export function getSelectedTodoIds(selection: TodoSelection): ID[] {
  return selection.type === TodoSelectionType.SELECT
    ? selection.selectedTodoIds
    : EMPTY;
}

export function isSelected(selection: TodoSelection, todoId: ID): boolean {
  return (
    selection.type === TodoSelectionType.SELECT &&
    selection.selectedTodoIds.includes(todoId)
  );
}

export function isSelectedSome(selection: TodoSelection): boolean {
  return (
    selection.type === TodoSelectionType.SELECT &&
    selection.selectedTodoIds.length > 0
  );
}

export function isExpanded(selection: TodoSelection, todoId: ID): boolean {
  return (
    selection.type === TodoSelectionType.EXPAND &&
    selection.expandedTodoId === todoId
  );
}
