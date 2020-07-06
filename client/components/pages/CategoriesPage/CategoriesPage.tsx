import React from 'react';

import { CategoryCreateInput } from '../../../graphql/__generated__/baseTypes';
import {
  useCategoriesPageQuery,
  useCreateOneCategoryMutation,
  useDeleteOneCategoryMutation,
  useUpdateOneCategoryMutation,
} from '../../../graphql/__generated__/CategoriesPage.graphql';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { ID } from '../../../viewModels/ID';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryList } from './CategoryList';
import { CategoryStatusBar } from './CategoryStatusBar';

export const CategoriesPage: React.FunctionComponent<EmptyProps> = () => {
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
    (category: RootCategoryFragment) => {
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
    deselect();
    deleteOneCategory({ variables: { where: { id: currentCategoryId } } });
  }, [deselect, deleteOneCategory, currentCategoryId]);

  const handleUpdateOneCategory = React.useCallback(() => {
    if (!currentCategoryId) return;
    updateOneCategory({
      variables: { data: { name }, where: { id: currentCategoryId } },
    });
  }, [name, updateOneCategory, currentCategoryId]);

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
    <PageContent onClick={handleDeselectCategory}>
      <CategoryStatusBar count={categories.length} />
      <CategoryList
        categories={categories}
        currentCategoryId={currentCategoryId}
        onClick={handleSelectCategory}
      />
      <CategoryEditForm
        isSelected={isSelected}
        name={name}
        onChangeName={handleChangeName}
        onCreateOneCategory={handleCreateOneCategory}
        onDeleteOneCategory={handleDeleteOneCategory}
        onUpdateOneCategory={handleUpdateOneCategory}
      />
    </PageContent>
  );
};
