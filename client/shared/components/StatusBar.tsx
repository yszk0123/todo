import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { isNotNull } from '../helpers/isNotNull';
import { Link } from './Link';

export enum StatusBarItemType {
  TEXT,
  FLEX,
  LINK,
  BUTTON,
}

export type StatusBarItem =
  | {
      content: string;
      type: StatusBarItemType.TEXT;
    }
  | {
      content: React.ReactNode;
      type: StatusBarItemType.FLEX;
    }
  | {
      content: { label: string; onClick: () => void };
      type: StatusBarItemType.BUTTON;
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
    case StatusBarItemType.FLEX: {
      return (
        <Flex alignItems="center" mx={1}>
          {item.content}
        </Flex>
      );
    }
    case StatusBarItemType.LINK: {
      return (
        <Box mx={1}>
          <Link
            as={item.content.as}
            href={item.content.href}
            text={item.content.text}
          />
        </Box>
      );
    }
    case StatusBarItemType.BUTTON: {
      return (
        <Flex
          alignItems="center"
          mx={1}
          sx={{ cursor: 'pointer' }}
          variant="link"
          onClick={item.content.onClick}
        >
          <Text>{item.content.label}</Text>
        </Flex>
      );
    }
  }
};

export const StatusBar: React.FunctionComponent<{
  left?: (StatusBarItem | null)[];
  right?: (StatusBarItem | null)[];
}> = ({ left = [], right = [] }) => {
  return (
    <Flex color="gray" fontSize={2} justifyContent="space-between" mb={2}>
      <Flex alignItems="center" justifyContent="flex-start" overflowX="auto">
        <Flex alignItems="center" flexShrink={0}>
          {left.filter(isNotNull).map((item, i) => {
            return <StatusBarItemView item={item} key={i} />;
          })}
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        flexGrow={1}
        flexShrink={0}
        justifyContent="flex-end"
        overflowX="auto"
      >
        <Flex alignItems="center" flexShrink={0}>
          {right.filter(isNotNull).map((item, i) => {
            return <StatusBarItemView item={item} key={i} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
