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

export type CategoryCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutCategoriesInput;
  tags?: Maybe<TagCreateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
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

export type CategoryFilter = {
  every?: Maybe<CategoryWhereInput>;
  none?: Maybe<CategoryWhereInput>;
  some?: Maybe<CategoryWhereInput>;
};

export type CategoryScalarWhereInput = {
  AND?: Maybe<Array<CategoryScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<CategoryScalarWhereInput>>;
  OR?: Maybe<Array<CategoryScalarWhereInput>>;
  ownerId?: Maybe<IntFilter>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CategoryUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type CategoryUpdateManyWithoutOwnerInput = {
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
  create?: Maybe<Array<CategoryCreateWithoutOwnerInput>>;
  delete?: Maybe<Array<CategoryWhereUniqueInput>>;
  deleteMany?: Maybe<Array<CategoryScalarWhereInput>>;
  disconnect?: Maybe<Array<CategoryWhereUniqueInput>>;
  set?: Maybe<Array<CategoryWhereUniqueInput>>;
  update?: Maybe<Array<CategoryUpdateWithWhereUniqueWithoutOwnerInput>>;
  updateMany?: Maybe<Array<CategoryUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<CategoryUpsertWithWhereUniqueWithoutOwnerInput>>;
};

export type CategoryUpdateManyWithoutTagsInput = {
  connect?: Maybe<Array<CategoryWhereUniqueInput>>;
  create?: Maybe<Array<CategoryCreateWithoutTagsInput>>;
  delete?: Maybe<Array<CategoryWhereUniqueInput>>;
  deleteMany?: Maybe<Array<CategoryScalarWhereInput>>;
  disconnect?: Maybe<Array<CategoryWhereUniqueInput>>;
  set?: Maybe<Array<CategoryWhereUniqueInput>>;
  update?: Maybe<Array<CategoryUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: Maybe<Array<CategoryUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<CategoryUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type CategoryUpdateManyWithWhereNestedInput = {
  data: CategoryUpdateManyDataInput;
  where: CategoryScalarWhereInput;
};

export type CategoryUpdateOneRequiredWithoutTodosInput = {
  connect?: Maybe<CategoryWhereUniqueInput>;
  create?: Maybe<CategoryCreateWithoutTodosInput>;
  update?: Maybe<CategoryUpdateWithoutTodosDataInput>;
  upsert?: Maybe<CategoryUpsertWithoutTodosInput>;
};

export type CategoryUpdateWithoutOwnerDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTagsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTodosDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
};

export type CategoryUpdateWithWhereUniqueWithoutOwnerInput = {
  data: CategoryUpdateWithoutOwnerDataInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateWithWhereUniqueWithoutTagsInput = {
  data: CategoryUpdateWithoutTagsDataInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpsertWithoutTodosInput = {
  create: CategoryCreateWithoutTodosInput;
  update: CategoryUpdateWithoutTodosDataInput;
};

export type CategoryUpsertWithWhereUniqueWithoutOwnerInput = {
  create: CategoryCreateWithoutOwnerInput;
  update: CategoryUpdateWithoutOwnerDataInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpsertWithWhereUniqueWithoutTagsInput = {
  create: CategoryCreateWithoutTagsInput;
  update: CategoryUpdateWithoutTagsDataInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryWhereInput = {
  AND?: Maybe<Array<CategoryWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<IntFilter>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DeleteTodoInput = {
  id: Scalars['Int'];
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createOneCategory: Category;
  createOneTag: Tag;
  createOneTodo: Todo;
  deleteOneCategory?: Maybe<Category>;
  deleteOneTag?: Maybe<Tag>;
  deleteTodo?: Maybe<Todo>;
  updateOneCategory?: Maybe<Category>;
  updateOneTag?: Maybe<Tag>;
  updateTodo?: Maybe<Todo>;
};


export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateOneTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateOneTodoArgs = {
  data: TodoCreateInput;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteOneTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTodoArgs = {
  data: DeleteTodoInput;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateOneTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
};

export type NullableDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  me?: Maybe<User>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  todos?: Maybe<Array<Todo>>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryTagArgs = {
  id: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

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

export type TagCreateInput = {
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
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

export type TagFilter = {
  every?: Maybe<TagWhereInput>;
  none?: Maybe<TagWhereInput>;
  some?: Maybe<TagWhereInput>;
};

export type TagScalarWhereInput = {
  AND?: Maybe<Array<TagScalarWhereInput>>;
  categories?: Maybe<CategoryFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TagScalarWhereInput>>;
  OR?: Maybe<Array<TagScalarWhereInput>>;
  ownerId?: Maybe<IntFilter>;
  todos?: Maybe<TodoFilter>;
};

export type TagUpdateInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type TagUpdateManyWithoutCategoriesInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutCategoriesInput>>;
  delete?: Maybe<Array<TagWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TagScalarWhereInput>>;
  disconnect?: Maybe<Array<TagWhereUniqueInput>>;
  set?: Maybe<Array<TagWhereUniqueInput>>;
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutCategoriesInput>>;
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutCategoriesInput>>;
};

export type TagUpdateManyWithoutOwnerInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutOwnerInput>>;
  delete?: Maybe<Array<TagWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TagScalarWhereInput>>;
  disconnect?: Maybe<Array<TagWhereUniqueInput>>;
  set?: Maybe<Array<TagWhereUniqueInput>>;
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutOwnerInput>>;
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutOwnerInput>>;
};

export type TagUpdateManyWithoutTodosInput = {
  connect?: Maybe<Array<TagWhereUniqueInput>>;
  create?: Maybe<Array<TagCreateWithoutTodosInput>>;
  delete?: Maybe<Array<TagWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TagScalarWhereInput>>;
  disconnect?: Maybe<Array<TagWhereUniqueInput>>;
  set?: Maybe<Array<TagWhereUniqueInput>>;
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutTodosInput>>;
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutTodosInput>>;
};

export type TagUpdateManyWithWhereNestedInput = {
  data: TagUpdateManyDataInput;
  where: TagScalarWhereInput;
};

export type TagUpdateWithoutCategoriesDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutOwnerDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutTodosDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
};

export type TagUpdateWithWhereUniqueWithoutCategoriesInput = {
  data: TagUpdateWithoutCategoriesDataInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutOwnerInput = {
  data: TagUpdateWithoutOwnerDataInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutTodosInput = {
  data: TagUpdateWithoutTodosDataInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutCategoriesInput = {
  create: TagCreateWithoutCategoriesInput;
  update: TagUpdateWithoutCategoriesDataInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutOwnerInput = {
  create: TagCreateWithoutOwnerInput;
  update: TagUpdateWithoutOwnerDataInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutTodosInput = {
  create: TagCreateWithoutTodosInput;
  update: TagUpdateWithoutTodosDataInput;
  where: TagWhereUniqueInput;
};

export type TagWhereInput = {
  AND?: Maybe<Array<TagWhereInput>>;
  categories?: Maybe<CategoryFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TagWhereInput>>;
  OR?: Maybe<Array<TagWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<IntFilter>;
  todos?: Maybe<TodoFilter>;
};

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Todo = {
  __typename?: 'Todo';
  archivedAt?: Maybe<Scalars['DateTime']>;
  author: User;
  authorId: Scalars['Int'];
  category: Category;
  categoryId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  status: TodoStatus;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  author: UserCreateOneWithoutTodosInput;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TodoStatus>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutCategoryInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  author: UserCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutTagsInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  author: UserCreateOneWithoutTodosInput;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  status?: Maybe<TodoStatus>;
  text: Scalars['String'];
};

export type TodoFilter = {
  every?: Maybe<TodoWhereInput>;
  none?: Maybe<TodoWhereInput>;
  some?: Maybe<TodoWhereInput>;
};

export type TodoScalarWhereInput = {
  AND?: Maybe<Array<TodoScalarWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  authorId?: Maybe<IntFilter>;
  categoryId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<TodoScalarWhereInput>>;
  OR?: Maybe<Array<TodoScalarWhereInput>>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagFilter>;
  text?: Maybe<StringFilter>;
};

export enum TodoStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  Waiting = 'WAITING'
}

export type TodoUpdateManyDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<TodoStatus>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateManyWithoutAuthorInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutAuthorInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type TodoUpdateManyWithoutCategoryInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutCategoryInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutCategoryInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutCategoryInput>>;
};

export type TodoUpdateManyWithoutTagsInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutTagsInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type TodoUpdateManyWithWhereNestedInput = {
  data: TodoUpdateManyDataInput;
  where: TodoScalarWhereInput;
};

export type TodoUpdateWithoutAuthorDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutCategoryDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneRequiredWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutTagsDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  author?: Maybe<UserUpdateOneRequiredWithoutTodosInput>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<TodoStatus>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithWhereUniqueWithoutAuthorInput = {
  data: TodoUpdateWithoutAuthorDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpdateWithWhereUniqueWithoutCategoryInput = {
  data: TodoUpdateWithoutCategoryDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpdateWithWhereUniqueWithoutTagsInput = {
  data: TodoUpdateWithoutTagsDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpsertWithWhereUniqueWithoutAuthorInput = {
  create: TodoCreateWithoutAuthorInput;
  update: TodoUpdateWithoutAuthorDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpsertWithWhereUniqueWithoutCategoryInput = {
  create: TodoCreateWithoutCategoryInput;
  update: TodoUpdateWithoutCategoryDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpsertWithWhereUniqueWithoutTagsInput = {
  create: TodoCreateWithoutTagsInput;
  update: TodoUpdateWithoutTagsDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoWhereInput = {
  AND?: Maybe<Array<TodoWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  author?: Maybe<UserWhereInput>;
  authorId?: Maybe<IntFilter>;
  category?: Maybe<CategoryWhereInput>;
  categoryId?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<TodoWhereInput>>;
  OR?: Maybe<Array<TodoWhereInput>>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagFilter>;
  text?: Maybe<StringFilter>;
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type UpdateTodoInput = {
  id: Scalars['Int'];
  tags?: Maybe<Array<Scalars['Int']>>;
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

export type UserUpdateOneRequiredWithoutCategoriesInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCategoriesInput>;
  update?: Maybe<UserUpdateWithoutCategoriesDataInput>;
  upsert?: Maybe<UserUpsertWithoutCategoriesInput>;
};

export type UserUpdateOneRequiredWithoutTagsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutTagsInput>;
  update?: Maybe<UserUpdateWithoutTagsDataInput>;
  upsert?: Maybe<UserUpsertWithoutTagsInput>;
};

export type UserUpdateOneRequiredWithoutTodosInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutTodosInput>;
  update?: Maybe<UserUpdateWithoutTodosDataInput>;
  upsert?: Maybe<UserUpsertWithoutTodosInput>;
};

export type UserUpdateWithoutCategoriesDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  tags?: Maybe<TagUpdateManyWithoutOwnerInput>;
  todos?: Maybe<TodoUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutTagsDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  todos?: Maybe<TodoUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutTodosDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  tags?: Maybe<TagUpdateManyWithoutOwnerInput>;
};

export type UserUpsertWithoutCategoriesInput = {
  create: UserCreateWithoutCategoriesInput;
  update: UserUpdateWithoutCategoriesDataInput;
};

export type UserUpsertWithoutTagsInput = {
  create: UserCreateWithoutTagsInput;
  update: UserUpdateWithoutTagsDataInput;
};

export type UserUpsertWithoutTodosInput = {
  create: UserCreateWithoutTodosInput;
  update: UserUpdateWithoutTodosDataInput;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  categories?: Maybe<CategoryFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  role?: Maybe<Role>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};
