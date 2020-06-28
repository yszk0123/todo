import React from 'react';
import { Link, Button, Flex, Text, Box } from 'rebass';
import { Input } from '@rebass/forms';
import NextLink from 'next/link';
import produce from 'immer';
import { ContentWrapper } from '../client/components/layout/ContentWrapper';
import {
  useCategoriesPageQuery,
  CreateOneCategoryMutationOptions,
  CategoriesPageQuery,
  CategoriesPageDocument,
  DeleteOneCategoryMutationOptions,
  useCreateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useUpdateOneCategoryMutation,
} from '../client/graphql/__generated__/CategoriesPage.graphql';
import { LoadingIndicator } from '../client/components/LodaingIndicator';
import { stopPropagation } from '../client/handlers/stopPropagation';
import {
  Category,
  CategoryCreateInput,
  CategoryWhereUniqueInput,
  CategoryUpdateInput,
} from '../client/graphql/__generated__/baseTypes';
import { preventDefault } from '../client/handlers/preventDefault';

const createOneCategoryMutationOptions: CreateOneCategoryMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<CategoriesPageQuery>({
      query: CategoriesPageDocument,
    });

    const category = result.data?.createOneCategory;
    if (!data || !category) return;
    const newData = produce(data, (d) => {
      d.categories = [...(d.categories ?? []), category];
    });

    cache.writeQuery<CategoriesPageQuery>({
      query: CategoriesPageDocument,
      data: newData,
    });
  },
};

const deleteOneCategoryMutationOptions: DeleteOneCategoryMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<CategoriesPageQuery>({
      query: CategoriesPageDocument,
    });

    const todoId = result.data?.deleteOneCategory?.id;
    if (!data || !todoId) return;
    const newData = produce(data, (d) => {
      d.categories = (d.categories ?? []).filter(
        (category) => category.id !== todoId
      );
    });

    cache.writeQuery<CategoriesPageQuery>({
      query: CategoriesPageDocument,
      data: newData,
    });
  },
};

const CategoryCount: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <Box>
      <Text textAlign="right" fontSize={2} color="gray">
        {count} categories
      </Text>
    </Box>
  );
};

const List: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Box mt={1} onClick={stopPropagation}>
      {children}
    </Box>
  );
};

const ListItem: React.FunctionComponent<{
  isActive: boolean;
  onClick: () => void;
}> = ({ isActive, children, onClick }) => {
  return (
    <Flex alignItems="center" p={2}>
      <Box
        flex="1 1 auto"
        bg={isActive ? 'highlight' : undefined}
        onClick={onClick}
      >
        {children}
      </Box>
    </Flex>
  );
};

const CategoryForm: React.FunctionComponent<{
  name: string;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCategory: () => void;
  onUpdateOneCategory: () => void;
  onDeleteOneCategory: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneCategory,
  onUpdateOneCategory,
  onDeleteOneCategory,
}) => {
  return (
    <Box as="form" my={2} onSubmit={preventDefault} onClick={stopPropagation}>
      <Flex alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        <Button
          type="button"
          width={1}
          variant="outline"
          onClick={onDeleteOneCategory}
        >
          Delete
        </Button>
        <Button
          type="button"
          width={1}
          variant="outline"
          ml={2}
          disabled={!isSelected}
          onClick={onUpdateOneCategory}
        >
          Update
        </Button>
        <Button
          type="submit"
          width={1}
          ml={2}
          variant="primary"
          onClick={onCreateOneCategory}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
};

const GoToTodoLink: React.FunctionComponent<{ categoryId: number }> = ({
  categoryId,
}) => {
  return (
    <NextLink
      href="/categories/[categoryId]/todos"
      as={`/categories/${categoryId}/todos`}
      passHref
    >
      <Link>Go</Link>
    </NextLink>
  );
};

const CategoriesPage: React.FunctionComponent<{}> = () => {
  const { data, loading } = useCategoriesPageQuery();
  const [createOneCategory] = useCreateOneCategoryMutation(
    createOneCategoryMutationOptions
  );
  const [deleteOneCategory] = useDeleteOneCategoryMutation(
    deleteOneCategoryMutationOptions
  );
  const [updateOneCategory] = useUpdateOneCategoryMutation();
  const [name, setName] = React.useState('');
  const [currentCategoryId, setCurrentCategoryId] = React.useState<
    number | null
  >(null);
  const isSelected = !!currentCategoryId;

  const deselect = React.useCallback(() => {
    setCurrentCategoryId(null);
    setName('');
  }, []);

  const handleSelectCategory = React.useCallback(
    (category: Pick<Category, 'id' | 'name'>) => {
      if (category.id !== currentCategoryId) {
        setCurrentCategoryId(category.id);
        setName(category.name);
      } else {
        deselect();
      }
    },
    [currentCategoryId, deselect]
  );

  const handleDeselectCategory = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneCategory = React.useCallback(() => {
    if (data?.me) {
      const newData: CategoryCreateInput = {
        owner: { connect: { id: data.me.id } },
        name,
      };
      createOneCategory({ variables: { data: newData } });
      deselect();
    }
  }, [data, name, deselect, createOneCategory]);

  const handleDeleteOneCategory = React.useCallback(() => {
    if (!currentCategoryId) return;
    if (!confirm('Delete?')) return;
    const where: CategoryWhereUniqueInput = { id: currentCategoryId };
    deleteOneCategory({ variables: { where } });
    deselect();
  }, [data, name, deselect, createOneCategory, currentCategoryId]);

  const handleUpdateOneCategory = React.useCallback(() => {
    if (!currentCategoryId) return;
    const newData: CategoryUpdateInput = { name };
    const where: CategoryWhereUniqueInput = { id: currentCategoryId };
    updateOneCategory({ variables: { data: newData, where } });
  }, [data, name, createOneCategory, currentCategoryId]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      setName(name);
    },
    []
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return null;
  }

  const categories = data.categories ?? [];

  return (
    <ContentWrapper onClick={handleDeselectCategory}>
      <CategoryCount count={categories.length} />
      <List>
        {categories.map((category) => {
          return (
            <ListItem
              key={category.id}
              isActive={category.id === currentCategoryId}
              onClick={() => handleSelectCategory(category)}
            >
              <GoToTodoLink categoryId={category.id} />
              <Text>{category.name}</Text>
            </ListItem>
          );
        })}
      </List>
      <CategoryForm
        name={name}
        isSelected={isSelected}
        onChangeName={handleChangeName}
        onCreateOneCategory={handleCreateOneCategory}
        onUpdateOneCategory={handleUpdateOneCategory}
        onDeleteOneCategory={handleDeleteOneCategory}
      />
    </ContentWrapper>
  );
};

export default CategoriesPage;
