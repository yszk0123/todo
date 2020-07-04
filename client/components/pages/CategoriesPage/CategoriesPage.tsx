import React from 'react';
import { ContentWrapper } from '../../layout/ContentWrapper';
import {
  useCategoriesPageQuery,
  useCreateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useUpdateOneCategoryMutation,
} from '../../../graphql/__generated__/CategoriesPage.graphql';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import {
  CategoryCreateInput,
  CategoryWhereUniqueInput,
  CategoryUpdateInput,
} from '../../../graphql/__generated__/baseTypes';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryList } from './CategoryList';
import { CategoryCount } from './CategoryCount';
import { ID } from '../../../viewModels/ID';

export const CategoriesPage: React.FunctionComponent<{}> = () => {
  const { data, loading, refetch } = useCategoriesPageQuery({
    fetchPolicy: 'cache-and-network',
  });
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
  const [currentCategoryId, setCurrentCategoryId] = React.useState<ID | null>(
    null
  );
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

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
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
      <CategoryEditForm
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
