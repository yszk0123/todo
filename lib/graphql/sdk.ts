import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { DocumentNode } from 'graphql';
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



export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  todos?: Maybe<Array<Todo>>;
  users?: Maybe<Array<User>>;
};

export type Todo = {
  __typename?: 'Todo';
  author: User;
  authorId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type TodoWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
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

export type ExampleQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'email'>
  )> }
);

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = (
  { __typename?: 'Query' }
  & { todos?: Maybe<Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'text' | 'createdAt'>
  )>> }
);


export const ExampleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"example"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]}]}}]}}]};
export const TodosDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"todos"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todos"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]}]}}]}}]};

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    example(variables?: ExampleQueryVariables): Promise<ExampleQuery> {
      return withWrapper(() => client.request<ExampleQuery>(print(ExampleDocument), variables));
    },
    todos(variables?: TodosQueryVariables): Promise<TodosQuery> {
      return withWrapper(() => client.request<TodosQuery>(print(TodosDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;