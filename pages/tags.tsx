import React from 'react';
import { Link, Button, Flex, Text, Box } from 'rebass';
import { Input } from '@rebass/forms';
import NextLink from 'next/link';
import produce from 'immer';
import { ContentWrapper } from '../client/components/layout/ContentWrapper';
import {
  useTagsPageQuery,
  CreateOneTagMutationOptions,
  TagsPageQuery,
  TagsPageDocument,
  DeleteOneTagMutationOptions,
  useCreateOneTagMutation,
  useDeleteOneTagMutation,
  useUpdateOneTagMutation,
} from '../client/graphql/__generated__/TagsPage.graphql';
import { LoadingIndicator } from '../client/components/LodaingIndicator';
import { stopPropagation } from '../client/handlers/stopPropagation';
import {
  Tag,
  TagCreateInput,
  TagWhereUniqueInput,
  TagUpdateInput,
} from '../client/graphql/__generated__/baseTypes';
import { preventDefault } from '../client/handlers/preventDefault';

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

const TagCount: React.FunctionComponent<{ count: number }> = ({ count }) => {
  return (
    <Box>
      <Text textAlign="right" fontSize={2} color="gray">
        {count} tags
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

const TagForm: React.FunctionComponent<{
  name: string;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTag: () => void;
  onUpdateOneTag: () => void;
  onDeleteOneTag: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneTag,
  onUpdateOneTag,
  onDeleteOneTag,
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
          onClick={onDeleteOneTag}
        >
          Delete
        </Button>
        <Button
          type="button"
          width={1}
          variant="outline"
          ml={2}
          disabled={!isSelected}
          onClick={onUpdateOneTag}
        >
          Update
        </Button>
        <Button
          type="submit"
          width={1}
          ml={2}
          variant="primary"
          onClick={onCreateOneTag}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
};

const TagsPage: React.FunctionComponent<{}> = () => {
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
    (tag: Pick<Tag, 'id' | 'name'>) => {
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
      <List>
        {tags.map((tag) => {
          return (
            <ListItem
              key={tag.id}
              isActive={tag.id === currentTagId}
              onClick={() => handleSelectTag(tag)}
            >
              <Text>{tag.name}</Text>
            </ListItem>
          );
        })}
      </List>
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

export default TagsPage;
