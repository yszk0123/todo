import { atom } from 'recoil';

export type TodoInput = {
  text: string;
};

export const todoInputState = atom<TodoInput>({
  key: 'todoInputState',
  default: { text: '' },
});
