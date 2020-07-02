export function isValidTagColor(color: string | null): boolean {
  if (color === null) {
    return false;
  }

  // Disallow upper case for simplicity
  // Disallow 3 characters (e.g. #fff) for simplicity
  return /^#[0-9a-f]{6}$/.test(color);
}
