import { atom } from 'recoil';

export const todoInputState = atom({
  key: 'todoInputState',
  default: { text: '' },
});
