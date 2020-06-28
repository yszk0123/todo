export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  tags: Array<Tag>;
  todos: Array<Todo>;
};


export type CategoryTagsArgs = {
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type CategoryTodosArgs = {
  after?: Maybe<TodoWhereUniqueInput>;
  before?: Maybe<TodoWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type CategoryCreateManyWithoutOwnerInput = {
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
  create?: Maybe<Array<CategoryCreateWithoutOwnerInput>>;
};

export type CategoryCreateManyWithoutTagsInput = {
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
  create?: Maybe<Array<CategoryCreateWithoutTagsInput>>;
};

export type CategoryCreateOneWithoutTodosInput = {
  connect?: Maybe<CategoryWhereUniqueInput>;
  create?: Maybe<CategoryCreateWithoutTodosInput>;
};

export type CategoryCreateWithoutOwnerInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  tags?: Maybe<TagCreateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTagsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutCategoriesInput;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTodosInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutCategoriesInput;
  tags?: Maybe<TagCreateManyWithoutCategoriesInput>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};


export type DeleteTodoInput = {
  id: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createOneTodo: Todo;
  deleteTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateOneTodoArgs = {
  data: TodoCreateInput;
};


export type MutationDeleteTodoArgs = {
  data: DeleteTodoInput;
};


export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  me?: Maybe<User>;
  tags?: Maybe<Array<Tag>>;
  todos?: Maybe<Array<Todo>>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Tag = {
  __typename?: 'Tag';
  categories: Array<Category>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  todos: Array<Todo>;
};


export type TagCategoriesArgs = {
  after?: Maybe<CategoryWhereUniqueInput>;
  before?: Maybe<CategoryWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type TagTodosArgs = {
  after?: Maybe<TodoWhereUniqueInput>;
  before?: Maybe<TodoWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TagCreateManyWithoutCategoriesInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutCategoriesInput>>;
};

export type TagCreateManyWithoutOwnerInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutOwnerInput>>;
};

export type TagCreateManyWithoutTodosInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutTodosInput>>;
};

export type TagCreateWithoutCategoriesInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutOwnerInput = {
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutTodosInput = {
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
};

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Todo = {
  __typename?: 'Todo';
  author: User;
  authorId: Scalars['Int'];
  category: Category;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  tags: Array<Tag>;
  text: Scalars['String'];
};


export type TodoTagsArgs = {
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TodoCreateInput = {
  author: UserCreateOneWithoutTodosInput;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateManyWithoutAuthorInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutAuthorInput>>;
};

export type TodoCreateManyWithoutCategoryInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutCategoryInput>>;
};

export type TodoCreateManyWithoutTagsInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutTagsInput>>;
};

export type TodoCreateWithoutAuthorInput = {
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutCategoryInput = {
  author: UserCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutTagsInput = {
  author: UserCreateOneWithoutTodosInput;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type UpdateTodoInput = {
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  todos: Array<Todo>;
};


export type UserTodosArgs = {
  after?: Maybe<TodoWhereUniqueInput>;
  before?: Maybe<TodoWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserCreateOneWithoutCategoriesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCategoriesInput>;
};

export type UserCreateOneWithoutTagsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutTagsInput>;
};

export type UserCreateOneWithoutTodosInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutTodosInput>;
};

export type UserCreateWithoutCategoriesInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  role?: Maybe<Role>;
  tags?: Maybe<TagCreateManyWithoutOwnerInput>;
  todos?: Maybe<TodoCreateManyWithoutAuthorInput>;
};

export type UserCreateWithoutTagsInput = {
  categories?: Maybe<CategoryCreateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  role?: Maybe<Role>;
  todos?: Maybe<TodoCreateManyWithoutAuthorInput>;
};

export type UserCreateWithoutTodosInput = {
  categories?: Maybe<CategoryCreateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name: Scalars['String'];
  role?: Maybe<Role>;
  tags?: Maybe<TagCreateManyWithoutOwnerInput>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};
