import React from 'react';
import { Flex, Text } from 'rebass';

type Props = {
  hasStrikeThrough?: boolean;
  subElement?: JSX.Element | null;
};

export const ListText: React.FunctionComponent<Props> = ({
  children,
  hasStrikeThrough = false,
  subElement,
}) => {
  return (
    <Text
      lineHeight="1.5"
      sx={{
        textDecoration: hasStrikeThrough ? 'line-through double' : undefined,
      }}
    >
      {children}
      {subElement != null && <Flex sx={{ float: 'right' }}>{subElement}</Flex>}
    </Text>
  );
};
