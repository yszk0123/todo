import { Todo } from '../graphql/__generated__/baseTypes';
export type TodoVM = Pick<Todo, 'id' | 'text'>;
