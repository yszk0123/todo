export enum KeyCode {
  A = 'KeyA',
  B = 'KeyB',
  C = 'KeyC',
  D = 'KeyD',
  N = 'KeyN',
  S = 'KeyS',
  V = 'KeyV',
  X = 'KeyX',
  Z = 'KeyZ',
}

const keyCodeMap = new Set<string>(Object.values(KeyCode));

export function isKeyCode(code: string): code is KeyCode {
  return keyCodeMap.has(code);
}
