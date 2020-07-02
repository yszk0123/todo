import React from 'react';
import produce from 'immer';
import { ContentWrapper } from '../../layout/ContentWrapper';
import {
  useCategoriesPageQuery,
  CategoriesPageQuery,
  CategoriesPageDocument,
  useCreateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useUpdateOneCategoryMutation,
} from '../../../graphql/__generated__/CategoriesPage.graphql';
import { LoadingIndicator } from '../../atoms/LoadingIndicator';
import {
  CategoryCreateInput,
  CategoryWhereUniqueInput,
  CategoryUpdateInput,
} from '../../../graphql/__generated__/baseTypes';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { CategoryListItem } from './CategoryListItem';
import { CategoryForm } from './CategoryForm';
import { CategoryList } from './CategoryList';
import { CategoryCount } from './CategoryCount';

export const CategoriesPage: React.FunctionComponent<{}> = () => {
  const { data, loading, refetch } = useCategoriesPageQuery();
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneCategory] = useCreateOneCategoryMutation({
    onCompleted: handleCompleted,
  });
  const [deleteOneCategory] = useDeleteOneCategoryMutation({
    onCompleted: handleCompleted,
  });
  const [updateOneCategory] = useUpdateOneCategoryMutation({
    onCompleted: handleCompleted,
  });
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
      deselect();
      createOneCategory({ variables: { data: newData } });
    }
  }, [data, name, deselect, createOneCategory]);

  const handleDeleteOneCategory = React.useCallback(() => {
    if (!currentCategoryId) return;
    if (!confirm('Delete?')) return;
    const where: CategoryWhereUniqueInput = { id: currentCategoryId };
    deselect();
    deleteOneCategory({ variables: { where } });
  }, [data, name, deselect, deleteOneCategory, currentCategoryId]);

  const handleUpdateOneCategory = React.useCallback(() => {
    if (!currentCategoryId) return;
    const newData: CategoryUpdateInput = { name };
    const where: CategoryWhereUniqueInput = { id: currentCategoryId };
    updateOneCategory({ variables: { data: newData, where } });
  }, [data, name, updateOneCategory, currentCategoryId]);

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
      <CategoryList
        categories={categories}
        currentCategoryId={currentCategoryId}
        onClick={handleSelectCategory}
      />
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
