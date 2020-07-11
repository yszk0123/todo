import { identity } from './identity';

export function toggle<T>(values: T[], value: T): T[] {
  return toggleWith(values, value, identity);
}

export function toggleWith<T, K>(
  values: T[],
  value: T,
  getKey: (value: T) => K
): T[] {
  const doesContain = values.findIndex((v) => getKey(v) === getKey(value)) >= 0;
  const newValues = doesContain
    ? values.filter((v) => getKey(v) !== getKey(value))
    : [...values, value];
  return newValues;
}
