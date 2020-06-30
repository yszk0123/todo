export function createLookupTable<T extends { id: number | string }>(
  values: T[]
): Record<string, true | undefined> {
  const table: Record<string, true | undefined> = {};
  values.forEach((value) => {
    table[value.id] = true;
  });
  return table;
}
