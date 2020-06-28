import { Todo } from '../graphql/__generated__/baseTypes';
import { TagVM } from './TagVM';

export type TodoVM = Pick<Todo, 'id' | 'text'> & { tags: TagVM[] };
