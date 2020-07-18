export enum KeyCode {
  A = 'KeyA',
  B = 'KeyB',
  C = 'KeyC',
  D = 'KeyD',
  E = 'KeyE',
  Minus = 'Minus',
  N = 'KeyN',
  O = 'KeyO',
  Period = 'Period',
  S = 'KeyS',
  V = 'KeyV',
  X = 'KeyX',
  Z = 'KeyZ',
}

const keyCodeMap = new Set<string>(Object.values(KeyCode));

export function isKeyCode(code: string): code is KeyCode {
  return keyCodeMap.has(code);
}
