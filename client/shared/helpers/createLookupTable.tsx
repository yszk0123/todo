import { ID } from '../../viewModels/ID';

export function createLookupTable<T extends { id: ID }>(
  values: T[]
): Record<string, true | undefined> {
  const table: Record<string, true | undefined> = {};
  values.forEach((value) => {
    table[value.id] = true;
  });
  return table;
}
