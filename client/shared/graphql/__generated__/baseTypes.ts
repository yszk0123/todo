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
  DateTime: string & {readonly __opaque__: 'DateTime'};
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
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  tags?: Maybe<TagCreateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTagsInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutCategoriesInput;
  todos?: Maybe<TodoCreateManyWithoutCategoryInput>;
};

export type CategoryCreateWithoutTodosInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<NullableDateTimeFilter>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateManyDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagUpdateManyWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTagsDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCategoriesInput>;
  todos?: Maybe<TodoUpdateManyWithoutCategoryInput>;
};

export type CategoryUpdateWithoutTodosDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
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
  archivedAt?: Maybe<NullableDateTimeFilter>;
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

export type Checkpoint = {
  __typename?: 'Checkpoint';
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt: Scalars['DateTime'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  ownerId: Scalars['String'];
};

export type CheckpointCreateInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutCheckpointsInput;
  todos?: Maybe<TodoCreateManyWithoutCheckpointInput>;
};

export type CheckpointCreateManyWithoutOwnerInput = {
  connect?: Maybe<Array<CheckpointWhereUniqueInput>>;
  create?: Maybe<Array<CheckpointCreateWithoutOwnerInput>>;
};

export type CheckpointCreateOneWithoutTodosInput = {
  connect?: Maybe<CheckpointWhereUniqueInput>;
  create?: Maybe<CheckpointCreateWithoutTodosInput>;
};

export type CheckpointCreateWithoutOwnerInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoCreateManyWithoutCheckpointInput>;
};

export type CheckpointCreateWithoutTodosInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutCheckpointsInput;
};

export type CheckpointFilter = {
  every?: Maybe<CheckpointWhereInput>;
  none?: Maybe<CheckpointWhereInput>;
  some?: Maybe<CheckpointWhereInput>;
};

export type CheckpointScalarWhereInput = {
  AND?: Maybe<Array<CheckpointScalarWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  endAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<NullableStringFilter>;
  NOT?: Maybe<Array<CheckpointScalarWhereInput>>;
  OR?: Maybe<Array<CheckpointScalarWhereInput>>;
  ownerId?: Maybe<StringFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CheckpointUpdateInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCheckpointsInput>;
  todos?: Maybe<TodoUpdateManyWithoutCheckpointInput>;
};

export type CheckpointUpdateManyDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CheckpointUpdateManyWithoutOwnerInput = {
  connect?: Maybe<Array<CheckpointWhereUniqueInput>>;
  create?: Maybe<Array<CheckpointCreateWithoutOwnerInput>>;
  delete?: Maybe<Array<CheckpointWhereUniqueInput>>;
  deleteMany?: Maybe<Array<CheckpointScalarWhereInput>>;
  disconnect?: Maybe<Array<CheckpointWhereUniqueInput>>;
  set?: Maybe<Array<CheckpointWhereUniqueInput>>;
  update?: Maybe<Array<CheckpointUpdateWithWhereUniqueWithoutOwnerInput>>;
  updateMany?: Maybe<Array<CheckpointUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<CheckpointUpsertWithWhereUniqueWithoutOwnerInput>>;
};

export type CheckpointUpdateManyWithWhereNestedInput = {
  data: CheckpointUpdateManyDataInput;
  where: CheckpointScalarWhereInput;
};

export type CheckpointUpdateOneWithoutTodosInput = {
  connect?: Maybe<CheckpointWhereUniqueInput>;
  create?: Maybe<CheckpointCreateWithoutTodosInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<CheckpointUpdateWithoutTodosDataInput>;
  upsert?: Maybe<CheckpointUpsertWithoutTodosInput>;
};

export type CheckpointUpdateWithoutOwnerDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoUpdateManyWithoutCheckpointInput>;
};

export type CheckpointUpdateWithoutTodosDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  endAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutCheckpointsInput>;
};

export type CheckpointUpdateWithWhereUniqueWithoutOwnerInput = {
  data: CheckpointUpdateWithoutOwnerDataInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointUpsertWithoutTodosInput = {
  create: CheckpointCreateWithoutTodosInput;
  update: CheckpointUpdateWithoutTodosDataInput;
};

export type CheckpointUpsertWithWhereUniqueWithoutOwnerInput = {
  create: CheckpointCreateWithoutOwnerInput;
  update: CheckpointUpdateWithoutOwnerDataInput;
  where: CheckpointWhereUniqueInput;
};

export type CheckpointWhereInput = {
  AND?: Maybe<Array<CheckpointWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  endAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<NullableStringFilter>;
  NOT?: Maybe<Array<CheckpointWhereInput>>;
  OR?: Maybe<Array<CheckpointWhereInput>>;
  owner?: Maybe<UserWhereInput>;
  ownerId?: Maybe<StringFilter>;
  todos?: Maybe<TodoFilter>;
};

export type CheckpointWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export enum Color {
  Blue = 'BLUE',
  Default = 'DEFAULT',
  Green = 'GREEN',
  Purple = 'PURPLE',
  Red = 'RED',
  Yellow = 'YELLOW'
}


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

export type DeleteTodosByIdInput = {
  ids: Array<Scalars['ID']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createOneCategory: Category;
  createOneCheckpoint: Checkpoint;
  createOneTag: Tag;
  createOneTodo: Todo;
  deleteOneCategory?: Maybe<Category>;
  deleteOneCheckpoint?: Maybe<Checkpoint>;
  deleteOneTag?: Maybe<Tag>;
  deleteTodo?: Maybe<Todo>;
  deleteTodosById?: Maybe<Array<Scalars['ID']>>;
  updateOneCategory?: Maybe<Category>;
  updateOneCheckpoint?: Maybe<Checkpoint>;
  updateOneTag?: Maybe<Tag>;
  updateTodo?: Maybe<Todo>;
  updateTodosById?: Maybe<Array<Todo>>;
};


export type MutationCreateOneCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateOneCheckpointArgs = {
  data: CheckpointCreateInput;
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


export type MutationDeleteOneCheckpointArgs = {
  where: CheckpointWhereUniqueInput;
};


export type MutationDeleteOneTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTodoArgs = {
  data: DeleteTodoInput;
};


export type MutationDeleteTodosByIdArgs = {
  data: DeleteTodosByIdInput;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateOneCheckpointArgs = {
  data: CheckpointUpdateInput;
  where: CheckpointWhereUniqueInput;
};


export type MutationUpdateOneTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTodoArgs = {
  data: UpdateTodoInput;
};


export type MutationUpdateTodosByIdArgs = {
  data: UpdateTodosByIdInput;
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

export type Page = {
  __typename?: 'Page';
  isSyncing?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  checkpoints: Array<Checkpoint>;
  me?: Maybe<User>;
  page?: Maybe<Page>;
  stats?: Maybe<Stats>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  todos: Array<Todo>;
};


export type QueryCategoriesArgs = {
  after?: Maybe<CategoryWhereUniqueInput>;
  before?: Maybe<CategoryWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryCheckpointsArgs = {
  after?: Maybe<CheckpointWhereUniqueInput>;
  before?: Maybe<CheckpointWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<CheckpointWhereInput>;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<TagWhereInput>;
};


export type QueryTodosArgs = {
  after?: Maybe<TodoWhereUniqueInput>;
  before?: Maybe<TodoWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  where?: Maybe<TodoWhereInput>;
};

export type Stats = {
  __typename?: 'Stats';
  categoryCount?: Maybe<Scalars['Int']>;
  checkpointCount?: Maybe<Scalars['Int']>;
  tagCount?: Maybe<Scalars['Int']>;
  todoCount?: Maybe<Scalars['Int']>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories: Array<Category>;
  color: Color;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  color?: Maybe<Color>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  color?: Maybe<Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner: UserCreateOneWithoutTagsInput;
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutOwnerInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  color?: Maybe<Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  todos?: Maybe<TodoCreateManyWithoutTagsInput>;
};

export type TagCreateWithoutTodosInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryCreateManyWithoutTagsInput>;
  color?: Maybe<Color>;
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
  archivedAt?: Maybe<OrderByArg>;
  color?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  ownerId?: Maybe<OrderByArg>;
};

export type TagScalarWhereInput = {
  AND?: Maybe<Array<TagScalarWhereInput>>;
  archivedAt?: Maybe<NullableDateTimeFilter>;
  categories?: Maybe<CategoryFilter>;
  color?: Maybe<Color>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<UuidFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<TagScalarWhereInput>>;
  OR?: Maybe<Array<TagScalarWhereInput>>;
  ownerId?: Maybe<StringFilter>;
  todos?: Maybe<TodoFilter>;
};

export type TagUpdateInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateManyDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  color?: Maybe<Color>;
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
  archivedAt?: Maybe<Scalars['DateTime']>;
  color?: Maybe<Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTagsInput>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutOwnerDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  todos?: Maybe<TodoUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutTodosDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<CategoryUpdateManyWithoutTagsInput>;
  color?: Maybe<Color>;
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
  archivedAt?: Maybe<NullableDateTimeFilter>;
  categories?: Maybe<CategoryFilter>;
  color?: Maybe<Color>;
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
  checkpoint?: Maybe<Checkpoint>;
  checkpointId?: Maybe<Scalars['String']>;
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
  checkpoint?: Maybe<CheckpointCreateOneWithoutTodosInput>;
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

export type TodoCreateManyWithoutCheckpointInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutCheckpointInput>>;
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
  checkpoint?: Maybe<CheckpointCreateOneWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner: UserCreateOneWithoutTodosInput;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutCheckpointInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
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
  checkpoint?: Maybe<CheckpointCreateOneWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagCreateManyWithoutTodosInput>;
  text: Scalars['String'];
};

export type TodoCreateWithoutTagsInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category: CategoryCreateOneWithoutTodosInput;
  checkpoint?: Maybe<CheckpointCreateOneWithoutTodosInput>;
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
  checkpointId?: Maybe<OrderByArg>;
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
  checkpointId?: Maybe<NullableStringFilter>;
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

export type TodoUpdateManyWithoutCheckpointInput = {
  connect?: Maybe<Array<TodoWhereUniqueInput>>;
  create?: Maybe<Array<TodoCreateWithoutCheckpointInput>>;
  delete?: Maybe<Array<TodoWhereUniqueInput>>;
  deleteMany?: Maybe<Array<TodoScalarWhereInput>>;
  disconnect?: Maybe<Array<TodoWhereUniqueInput>>;
  set?: Maybe<Array<TodoWhereUniqueInput>>;
  update?: Maybe<Array<TodoUpdateWithWhereUniqueWithoutCheckpointInput>>;
  updateMany?: Maybe<Array<TodoUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<TodoUpsertWithWhereUniqueWithoutCheckpointInput>>;
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
  checkpoint?: Maybe<CheckpointUpdateOneWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  owner?: Maybe<UserUpdateOneRequiredWithoutTodosInput>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutCheckpointDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
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
  checkpoint?: Maybe<CheckpointUpdateOneWithoutTodosInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<TagUpdateManyWithoutTodosInput>;
  text?: Maybe<Scalars['String']>;
};

export type TodoUpdateWithoutTagsDataInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  category?: Maybe<CategoryUpdateOneRequiredWithoutTodosInput>;
  checkpoint?: Maybe<CheckpointUpdateOneWithoutTodosInput>;
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

export type TodoUpdateWithWhereUniqueWithoutCheckpointInput = {
  data: TodoUpdateWithoutCheckpointDataInput;
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

export type TodoUpsertWithWhereUniqueWithoutCheckpointInput = {
  create: TodoCreateWithoutCheckpointInput;
  update: TodoUpdateWithoutCheckpointDataInput;
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
  checkpoint?: Maybe<CheckpointWhereInput>;
  checkpointId?: Maybe<NullableStringFilter>;
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
  checkpointId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  status?: Maybe<TodoStatus>;
  tags?: Maybe<Array<Scalars['ID']>>;
  text?: Maybe<Scalars['String']>;
};

export type UpdateTodosByIdInput = {
  archivedAt?: Maybe<Scalars['DateTime']>;
  checkpointId?: Maybe<Scalars['ID']>;
  ids: Array<Scalars['ID']>;
  status?: Maybe<TodoStatus>;
  tags?: Maybe<Array<Scalars['ID']>>;
  text?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
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

export type UserCreateOneWithoutCheckpointsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCheckpointsInput>;
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
  checkpoints?: Maybe<CheckpointCreateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagCreateManyWithoutOwnerInput>;
  todos?: Maybe<TodoCreateManyWithoutOwnerInput>;
};

export type UserCreateWithoutCheckpointsInput = {
  accounts?: Maybe<AccountCreateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryCreateManyWithoutOwnerInput>;
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
  checkpoints?: Maybe<CheckpointCreateManyWithoutOwnerInput>;
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
  checkpoints?: Maybe<CheckpointCreateManyWithoutOwnerInput>;
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

export type UserUpdateOneRequiredWithoutCheckpointsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCheckpointsInput>;
  update?: Maybe<UserUpdateWithoutCheckpointsDataInput>;
  upsert?: Maybe<UserUpsertWithoutCheckpointsInput>;
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
  checkpoints?: Maybe<CheckpointUpdateManyWithoutOwnerInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<TagUpdateManyWithoutOwnerInput>;
  todos?: Maybe<TodoUpdateManyWithoutOwnerInput>;
};

export type UserUpdateWithoutCheckpointsDataInput = {
  accounts?: Maybe<AccountUpdateManyWithoutUserInput>;
  avatarUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<CategoryUpdateManyWithoutOwnerInput>;
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
  checkpoints?: Maybe<CheckpointUpdateManyWithoutOwnerInput>;
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
  checkpoints?: Maybe<CheckpointUpdateManyWithoutOwnerInput>;
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

export type UserUpsertWithoutCheckpointsInput = {
  create: UserCreateWithoutCheckpointsInput;
  update: UserUpdateWithoutCheckpointsDataInput;
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
  checkpoints?: Maybe<CheckpointFilter>;
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