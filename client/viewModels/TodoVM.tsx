import { Todo } from '../graphql/__generated__/baseTypes';
import { TagVM } from './TagVM';
import { CategoryTodoFragment } from '../graphql/__generated__/TodosPage.graphql';

export type TodoVM = CategoryTodoFragment;
