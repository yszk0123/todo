import React from 'react';
import produce from 'immer';
import { ContentWrapper } from './layout/ContentWrapper';
import {
  useCategoriesPageQuery,
  CreateOneCategoryMutationOptions,
  CategoriesPageQuery,
  CategoriesPageDocument,
  DeleteOneCategoryMutationOptions,
  useCreateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useUpdateOneCategoryMutation,
} from '../graphql/__generated__/CategoriesPage.graphql';
import { LoadingIndicator } from './LodaingIndicator';
import {
  CategoryCreateInput,
  CategoryWhereUniqueInput,
  CategoryUpdateInput,
} from '../graphql/__generated__/baseTypes';
import { CategoryVM } from '../viewModels/CategoryVM';
import { CategoryListItem } from './CategoryListItem';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { CategoryCount } from './CategoryCount';

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

export const CategoriesPage: React.FunctionComponent<{}> = () => {
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
    (category: CategoryVM) => {
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
      <CategoryList>
        {categories.map((category) => {
          return (
            <CategoryListItem
              key={category.id}
              category={category}
              isActive={category.id === currentCategoryId}
              onClick={handleSelectCategory}
            />
          );
        })}
      </CategoryList>
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
