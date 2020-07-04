import React from 'react';
import { ContentWrapper } from '../../layout/ContentWrapper';
import {
  useTagsPageQuery,
  useCreateOneTagMutation,
  useDeleteOneTagMutation,
  useUpdateOneTagMutation,
} from '../../../graphql/__generated__/TagsPage.graphql';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import {
  TagCreateInput,
  TagWhereUniqueInput,
  TagUpdateInput,
  Color,
} from '../../../graphql/__generated__/baseTypes';
import { TagEditForm } from './TagEditForm';
import { TagList } from './TagList';
import { TagCount } from './TagCount';
import { TagListItem } from './TagListItem';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';
import { ID } from '../../../viewModels/ID';

export const TagsPage: React.FunctionComponent<{}> = () => {
  const { data, loading, refetch } = useTagsPageQuery({
    fetchPolicy: 'cache-and-network',
  });
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneTag] = useCreateOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [deleteOneTag] = useDeleteOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [updateOneTag] = useUpdateOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState<Color>(Color.Default);
  const [tagCategories, setTagCategories] = React.useState<CategoryVM[]>([]);
  const [currentTagId, setCurrentTagId] = React.useState<ID | null>(null);
  const isSelected = !!currentTagId;

  const deselect = React.useCallback(() => {
    setCurrentTagId(null);
    setName('');
    setColor(Color.Default);
    setTagCategories([]);
  }, []);

  const handleSelectTag = React.useCallback(
    (tag: RootTagFragment) => {
      if (tag.id !== currentTagId) {
        setCurrentTagId(tag.id);
        setName(tag.name);
        setTagCategories(tag.categories);
        setColor(tag.color ?? '');
      } else {
        deselect();
      }
    },
    [currentTagId, deselect]
  );

  const handleDeselectTag = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneTag = React.useCallback(() => {
    if (data?.me) {
      const categoriesToConnect = tagCategories.map((c) => ({ id: c.id }));
      const newData: TagCreateInput = {
        owner: { connect: { id: data.me.id } },
        name,
        color,
        categories: { connect: categoriesToConnect },
      };
      deselect();
      createOneTag({ variables: { data: newData } });
    }
  }, [data, name, color, deselect, createOneTag, tagCategories]);

  const handleDeleteOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    if (!confirm('Delete?')) return;
    const where: TagWhereUniqueInput = { id: currentTagId };
    deselect();
    deleteOneTag({ variables: { where } });
  }, [data, name, deselect, deleteOneTag, currentTagId]);

  const handleUpdateOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    const categoriesToConnect = tagCategories.map((c) => ({ id: c.id }));
    const newData: TagUpdateInput = {
      name,
      color,
      categories: { connect: categoriesToConnect },
    };
    const where: TagWhereUniqueInput = { id: currentTagId };
    updateOneTag({ variables: { data: newData, where } });
  }, [data, name, color, updateOneTag, currentTagId, tagCategories]);

  const handleToggleTagCategory = React.useCallback(
    (tag: CategoryVM) => {
      const has = tagCategories.find((t) => t.id === tag.id);
      const newCategories = has
        ? tagCategories.filter((t) => t.id !== tag.id)
        : [...tagCategories, tag];
      setTagCategories(newCategories);
    },
    [tagCategories]
  );

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      setName(name);
    },
    []
  );

  const handleChangeColor = React.useCallback((color: Color) => {
    setColor(color);
  }, []);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const tags = data.tags ?? [];
  const categories = data.categories ?? [];

  return (
    <ContentWrapper onClick={handleDeselectTag}>
      <TagCount count={tags.length} />
      <TagList>
        {tags.map((tag) => {
          return (
            <TagListItem
              key={tag.id}
              tag={tag}
              isActive={tag.id === currentTagId}
              onClick={handleSelectTag}
            />
          );
        })}
      </TagList>
      <TagEditForm
        name={name}
        color={color}
        categories={categories}
        tagCategories={tagCategories}
        isSelected={isSelected}
        onChangeName={handleChangeName}
        onChangeColor={handleChangeColor}
        onCreateOneTag={handleCreateOneTag}
        onUpdateOneTag={handleUpdateOneTag}
        onDeleteOneTag={handleDeleteOneTag}
        onToggleCategory={handleToggleTagCategory}
      />
    </ContentWrapper>
  );
};
