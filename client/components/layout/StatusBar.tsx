import React from 'react';
import { Box, Flex, Text } from 'rebass';
import NextLink from 'next/link';
import { Link } from 'rebass';
import { isNotNull } from '../helpers/isNotNull';

export enum StatusBarItemType {
  TEXT,
  LINK,
}

export type StatusBarItem =
  | {
      type: StatusBarItemType.TEXT;
      content: string;
    }
  | {
      type: StatusBarItemType.LINK;
      content: { href: string; as: string; text: string };
    };

const StatusBarItemView: React.FunctionComponent<{
  item: StatusBarItem;
  isFirst: boolean;
}> = ({ item, isFirst }) => {
  switch (item.type) {
    case StatusBarItemType.TEXT: {
      return <Text mr={isFirst ? 2 : 0}>{item.content}</Text>;
    }
    case StatusBarItemType.LINK: {
      return (
        <NextLink href={item.content.href} as={item.content.as} passHref>
          <Link>{item.content.text}</Link>
        </NextLink>
      );
    }
  }
};

export const StatusBar: React.FunctionComponent<{
  left: (StatusBarItem | null)[];
  right: (StatusBarItem | null)[];
}> = ({ left, right }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} fontSize={2}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'gray',
        }}
      >
        {left.filter(isNotNull).map((item, i) => {
          return <StatusBarItemView key={i} item={item} isFirst={i === 0} />;
        })}
      </Flex>
      <Flex
        sx={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          color: 'gray',
        }}
      >
        {right.filter(isNotNull).map((item, i) => {
          return <StatusBarItemView key={i} item={item} isFirst={i === 0} />;
        })}
      </Flex>
    </Box>
  );
};
