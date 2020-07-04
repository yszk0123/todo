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
  UUID: any;
  /** The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type AccountCreateManyWithoutUserInput = {
  connect?: Maybe<Array<AccountWhereUniqueInput>>;
  create?: Maybe<Array<AccountCreateWithoutUserInput>>;
};

export type AccountCreateWithoutUserInput = {
  accessToken: Scalars['String'];
  accessTokenExpires?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  providerAccountId: Scalars['String'];
  providerId: Scalars['String'];
  providerType: Scalars['String'];
  refreshToken?: Maybe<Scalars['String']>;
};

export type AccountFilter = {
  every?: Maybe<AccountWhereInput>;
  none?: Maybe<AccountWhereInput>;
  some?: Maybe<AccountWhereInput>;
};

export type AccountScalarWhereInput = {
  accessToken?: Maybe<StringFilter>;
  accessTokenExpires?: Maybe<NullableDateTimeFilter>;
  AND?: Maybe<Array<AccountScalarWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  NOT?: Maybe<Array<AccountScalarWhereInput>>;
  OR?: Maybe<Array<AccountScalarWhereInput>>;
  providerAccountId?: Maybe<StringFilter>;
  providerId?: Maybe<StringFilter>;
  providerType?: Maybe<StringFilter>;
  refreshToken?: Maybe<NullableStringFilter>;
  userId?: Maybe<StringFilter>;
};

export type AccountUpdateManyDataInput = {
  accessToken?: Maybe<Scalars['String']>;
  accessTokenExpires?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  providerAccountId?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  providerType?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AccountUpdateManyWithoutUserInput = {
  connect?: Maybe<Array<AccountWhereUniqueInput>>;
  create?: Maybe<Array<AccountCreateWithoutUserInput>>;
  delete?: Maybe<Array<AccountWhereUniqueInput>>;
  deleteMany?: Maybe<Array<AccountScalarWhereInput>>;
  disconnect?: Maybe<Array<AccountWhereUniqueInput>>;
  set?: Maybe<Array<AccountWhereUniqueInput>>;
  update?: Maybe<Array<AccountUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: Maybe<Array<AccountUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<AccountUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AccountUpdateManyWithWhereNestedInput = {
  data: AccountUpdateManyDataInput;
  where: AccountScalarWhereInput;
};

export type AccountUpdateWithoutUserDataInput = {
  accessToken?: Maybe<Scalars['String']>;
  accessTokenExpires?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  providerAccountId?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  providerType?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type AccountUpdateWithWhereUniqueWithoutUserInput = {
  data: AccountUpdateWithoutUserDataInput;
  where: AccountWhereUniqueInput;
};

export type AccountUpsertWithWhereUniqueWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  update: AccountUpdateWithoutUserDataInput;
  where: AccountWhereUniqueInput;
};

export type AccountWhereInput = {
  accessToken?: Maybe<StringFilter>;
  accessTokenExpires?: Maybe<NullableDateTimeFilter>;
  AND?: Maybe<Array<AccountWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  NOT?: Maybe<Array<AccountWhereInput>>;
  OR?: Maybe<Array<AccountWhereInput>>;
  providerAccountId?: Maybe<StringFilter>;
  providerId?: Maybe<StringFilter>;
  providerType?: Maybe<StringFilter>;
  refreshToken?: Maybe<NullableStringFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type AccountWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  providerAccountId?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
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
  orderBy?: Maybe<TagOrderByInput>;
};


export type CategoryTodosArgs = {
  after?: Maybe<TodoWhereUniqueInput>;
  before?: Maybe<TodoWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TodoOrderByInput>;
  where?: Maybe<TodoWhereInput>;
};

export type CategoryCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  tags?: Maybe<TagCreateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTagsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutCategoriesInput;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTodosInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<CategoryScalarWhereInput>>;
  OR?: Maybe<Array<CategoryScalarWhereInput>>;
  ownerId?: Maybe<StringFilter>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CategoryUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTagsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTodosDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<StringFilter>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
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

export type NullableStringFilter = {
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

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

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
  id: Scalars['ID'];
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};

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
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
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
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutOwnerInput = {
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutTodosInput = {
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
};

export type TagFilter = {
  every?: Maybe<TagWhereInput>;
  none?: Maybe<TagWhereInput>;
  some?: Maybe<TagWhereInput>;
};

export type TagOrderByInput = {
  color?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  ownerId?: Maybe<OrderByArg>;
};

export type TagScalarWhereInput = {
  AND?: Maybe<Array<TagScalarWhereInput>>;
  categories?: Maybe<CategoryFilter>;
  color?: Maybe<NullableStringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TagScalarWhereInput>>;
  OR?: Maybe<Array<TagScalarWhereInput>>;
  ownerId?: Maybe<StringFilter>;
  todos?: Maybe<TodoFilter>;
};

export type TagUpdateInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateManyDataInput = {
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutOwnerDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutTodosDataInput = {
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
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
  color?: Maybe<NullableStringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TagWhereInput>>;
  OR?: Maybe<Array<TagWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<StringFilter>;
  todos?: Maybe<TodoFilter>;
};

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: Category;
  categoryId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  status: TodoStatus;
  tags: Array<Tag>;
  text: Scalars['String'];
};


export type TodoTagsArgs = {
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TagOrderByInput>;
};

export type TodoCreateInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutTodosInput;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateManyWithoutCategoryInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutCategoryInput>>;
};

export type TodoCreateManyWithoutOwnerInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutOwnerInput>>;
};

export type TodoCreateManyWithoutTagsInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutTagsInput>>;
};

export type TodoCreateWithoutCategoryInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutTodosInput;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutOwnerInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutTagsInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutTodosInput;
  status?: Maybe<TodoStatus>;
  text: Scalars['String'];
};

export type TodoFilter = {
  every?: Maybe<TodoWhereInput>;
  none?: Maybe<TodoWhereInput>;
  some?: Maybe<TodoWhereInput>;
};

export type TodoOrderByInput = {
  archivedAt?: Maybe<OrderByArg>;
  categoryId?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  ownerId?: Maybe<OrderByArg>;
  status?: Maybe<OrderByArg>;
  text?: Maybe<OrderByArg>;
};

export type TodoScalarWhereInput = {
  AND?: Maybe<Array<TodoScalarWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  categoryId?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  NOT?: Maybe<Array<TodoScalarWhereInput>>;
  OR?: Maybe<Array<TodoScalarWhereInput>>;
  ownerId?: Maybe<StringFilter>;
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
  id?: Maybe<Scalars['String']>;
  status?: Maybe<TodoStatus>;
  text?: Maybe<Scalars['String']>;
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

export type TodoUpdateManyWithoutOwnerInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutOwnerInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutOwnerInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutOwnerInput>>;
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

export type TodoUpdateWithoutCategoryDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTodosInput>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutOwnerDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutTagsDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTodosInput>;
  status?: Maybe<TodoStatus>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithWhereUniqueWithoutCategoryInput = {
  data: TodoUpdateWithoutCategoryDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpdateWithWhereUniqueWithoutOwnerInput = {
  data: TodoUpdateWithoutOwnerDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpdateWithWhereUniqueWithoutTagsInput = {
  data: TodoUpdateWithoutTagsDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpsertWithWhereUniqueWithoutCategoryInput = {
  create: TodoCreateWithoutCategoryInput;
  update: TodoUpdateWithoutCategoryDataInput;
  where: TodoWhereUniqueInput;
};

export type TodoUpsertWithWhereUniqueWithoutOwnerInput = {
  create: TodoCreateWithoutOwnerInput;
  update: TodoUpdateWithoutOwnerDataInput;
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
  category?: Maybe<CategoryWhereInput>;
  categoryId?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  NOT?: Maybe<Array<TodoWhereInput>>;
  OR?: Maybe<Array<TodoWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<StringFilter>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagFilter>;
  text?: Maybe<StringFilter>;
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type UpdateTodoInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  status?: Maybe<TodoStatus>;
  tags?: Maybe<Array<Scalars['ID']>>;
  text?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
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
  accounts?: Maybe<AccountCreateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagCreateManyWithoutOwnerInput>;
  todos?: Maybe<TodoCreateManyWithoutOwnerInput>;
};

export type UserCreateWithoutTagsInput = {
  accounts?: Maybe<AccountCreateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryCreateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoCreateManyWithoutOwnerInput>;
};

export type UserCreateWithoutTodosInput = {
  accounts?: Maybe<AccountCreateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryCreateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  accounts?: Maybe<AccountUpdateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagUpdateManyWithoutOwnerInput>;
  todos?: Maybe<TodoUpdateManyWithoutOwnerInput>;
};

export type UserUpdateWithoutTagsDataInput = {
  accounts?: Maybe<AccountUpdateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryUpdateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoUpdateManyWithoutOwnerInput>;
};

export type UserUpdateWithoutTodosDataInput = {
  accounts?: Maybe<AccountUpdateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryUpdateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  accounts?: Maybe<AccountFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  avatarUrl?: Maybe<NullableStringFilter>;
  categories?: Maybe<CategoryFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<NullableStringFilter>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  tags?: Maybe<TagFilter>;
  todos?: Maybe<TodoFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};


export type UuidFilter = {
  contains?: Maybe<Scalars['UUID']>;
  endsWith?: Maybe<Scalars['UUID']>;
  equals?: Maybe<Scalars['UUID']>;
  gt?: Maybe<Scalars['UUID']>;
  gte?: Maybe<Scalars['UUID']>;
  in?: Maybe<Array<Scalars['UUID']>>;
  lt?: Maybe<Scalars['UUID']>;
  lte?: Maybe<Scalars['UUID']>;
  not?: Maybe<Scalars['UUID']>;
  notIn?: Maybe<Array<Scalars['UUID']>>;
  startsWith?: Maybe<Scalars['UUID']>;
};
