import React from 'react';
import { Button, Flex, Text, Box } from 'rebass';
import { ContentWrapper } from '../client/components/layout/ContentWrapper';
import { useCategoriesPageQuery } from '../client/graphql/__generated__/CategoriesPage.graphql';
import { LoadingIndicator } from '../client/components/LodaingIndicator';
import { stopPropagation } from '../client/handlers/stopPropagation';

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

const ListItem: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Flex alignItems="center" p={2}>
      <Box flex="1 1 auto">{children}</Box>
    </Flex>
  );
};

const CategoriesPage: React.FunctionComponent<{}> = () => {
  const { data, loading } = useCategoriesPageQuery();
  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data) {
    return null;
  }

  const categories = data.categories ?? [];

  return (
    <ContentWrapper>
      <CategoryCount count={categories.length} />
      <List>
        {categories.map((category) => {
          return (
            <ListItem key={category.id}>
              <Text>{category.name}</Text>
            </ListItem>
          );
        })}
      </List>
    </ContentWrapper>
  );
};

export default CategoriesPage;
