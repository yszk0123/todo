import React from 'react';
import produce from 'immer';
import { ContentWrapper } from '../../layout/ContentWrapper';
import {
  useTagsPageQuery,
  CreateOneTagMutationOptions,
  TagsPageQuery,
  TagsPageDocument,
  DeleteOneTagMutationOptions,
  useCreateOneTagMutation,
  useDeleteOneTagMutation,
  useUpdateOneTagMutation,
} from '../../../graphql/__generated__/TagsPage.graphql';
import { LoadingIndicator } from '../../LodaingIndicator';
import {
  TagCreateInput,
  TagWhereUniqueInput,
  TagUpdateInput,
} from '../../../graphql/__generated__/baseTypes';
import { TagVM } from '../../../viewModels/TagVM';
import { TagForm } from './TagForm';
import { TagList } from './TagList';
import { TagCount } from './TagCount';
import { TagListItem } from './TagListItem';

const createOneTagMutationOptions: CreateOneTagMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<TagsPageQuery>({
      query: TagsPageDocument,
    });

    const tag = result.data?.createOneTag;
    if (!data || !tag) return;
    const newData = produce(data, (d) => {
      d.tags = [...(d.tags ?? []), tag];
    });

    cache.writeQuery<TagsPageQuery>({
      query: TagsPageDocument,
      data: newData,
    });
  },
};

const deleteOneTagMutationOptions: DeleteOneTagMutationOptions = {
  update(cache, result) {
    const data = cache.readQuery<TagsPageQuery>({
      query: TagsPageDocument,
    });

    const todoId = result.data?.deleteOneTag?.id;
    if (!data || !todoId) return;
    const newData = produce(data, (d) => {
      d.tags = (d.tags ?? []).filter((tag) => tag.id !== todoId);
    });

    cache.writeQuery<TagsPageQuery>({
      query: TagsPageDocument,
      data: newData,
    });
  },
};

export const TagsPage: React.FunctionComponent<{}> = () => {
  const { data, loading } = useTagsPageQuery();
  const [createOneTag] = useCreateOneTagMutation(createOneTagMutationOptions);
  const [deleteOneTag] = useDeleteOneTagMutation(deleteOneTagMutationOptions);
  const [updateOneTag] = useUpdateOneTagMutation();
  const [name, setName] = React.useState('');
  const [currentTagId, setCurrentTagId] = React.useState<number | null>(null);
  const isSelected = !!currentTagId;

  const deselect = React.useCallback(() => {
    setCurrentTagId(null);
    setName('');
  }, []);

  const handleSelectTag = React.useCallback(
    (tag: TagVM) => {
      if (tag.id !== currentTagId) {
        setCurrentTagId(tag.id);
        setName(tag.name);
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
      const newData: TagCreateInput = {
        owner: { connect: { id: data.me.id } },
        name,
      };
      createOneTag({ variables: { data: newData } });
      deselect();
    }
  }, [data, name, deselect, createOneTag]);

  const handleDeleteOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    if (!confirm('Delete?')) return;
    const where: TagWhereUniqueInput = { id: currentTagId };
    deleteOneTag({ variables: { where } });
    deselect();
  }, [data, name, deselect, createOneTag, currentTagId]);

  const handleUpdateOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    const newData: TagUpdateInput = { name };
    const where: TagWhereUniqueInput = { id: currentTagId };
    updateOneTag({ variables: { data: newData, where } });
  }, [data, name, createOneTag, currentTagId]);

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

  const tags = data.tags ?? [];

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
      <TagForm
        name={name}
        isSelected={isSelected}
        onChangeName={handleChangeName}
        onCreateOneTag={handleCreateOneTag}
        onUpdateOneTag={handleUpdateOneTag}
        onDeleteOneTag={handleDeleteOneTag}
      />
    </ContentWrapper>
  );
};
