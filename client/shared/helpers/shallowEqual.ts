export function shallowEqual<T>(a: T[], b: T[]): boolean {
  const length = a.length;
  if (length !== b.length) return false;

  for (let i = 0; i < length; i += 1) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
