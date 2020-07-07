import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { isNotNull } from '../helpers/isNotNull';
import { Link } from './Link';

export enum StatusBarItemType {
  TEXT,
  LINK,
}

export type StatusBarItem =
  | {
      content: string;
      type: StatusBarItemType.TEXT;
    }
  | {
      content: { as: string; href: string; text: string };
      type: StatusBarItemType.LINK;
    };

const StatusBarItemView: React.FunctionComponent<{
  item: StatusBarItem;
}> = ({ item }) => {
  switch (item.type) {
    case StatusBarItemType.TEXT: {
      return <Text mx={1}>{item.content}</Text>;
    }
    case StatusBarItemType.LINK: {
      return (
        <Box mx={2}>
          <Link
            as={item.content.as}
            href={item.content.href}
            text={item.content.text}
          />
        </Box>
      );
    }
  }
};

export const StatusBar: React.FunctionComponent<{
  left?: (StatusBarItem | null)[];
  right?: (StatusBarItem | null)[];
}> = ({ left = [], right = [] }) => {
  return (
    <Flex fontSize={2} justifyContent="space-between" mb={2}>
      <Flex
        overflowX="auto"
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'gray',
        }}
      >
        <Flex flexShrink={0}>
          {left.filter(isNotNull).map((item, i) => {
            return <StatusBarItemView item={item} key={i} />;
          })}
        </Flex>
      </Flex>
      <Flex
        flexShrink={0}
        overflowX="auto"
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'gray',
        }}
      >
        <Flex flexShrink={0}>
          {right.filter(isNotNull).map((item, i) => {
            return <StatusBarItemView item={item} key={i} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
