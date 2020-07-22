export function toCSV<T, K extends keyof T>(
  keys: K[],
  rows: { [L in K]: T[L] }[]
): string {
  const csvRows: string[] = [];

  rows.forEach((row) => {
    const csvColumns: string[] = [];
    keys.forEach((key) => {
      csvColumns.push(String(row[key]));
    });
    csvRows.push(csvColumns.join('\t'));
  });

  return csvRows.join(`\n`);
}
