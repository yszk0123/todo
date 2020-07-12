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
