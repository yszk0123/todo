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
        <Link
          as={item.content.as}
          href={item.content.href}
          text={item.content.text}
        />
      );
    }
  }
};

export const StatusBar: React.FunctionComponent<{
  left?: (StatusBarItem | null)[];
  right?: (StatusBarItem | null)[];
}> = ({ left = [], right = [] }) => {
  return (
    <Box fontSize={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: 'gray',
        }}
      >
        {left.filter(isNotNull).map((item, i) => {
          return <StatusBarItemView isFirst={i === 0} item={item} key={i} />;
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
          return <StatusBarItemView isFirst={i === 0} item={item} key={i} />;
        })}
      </Flex>
    </Box>
  );
};
