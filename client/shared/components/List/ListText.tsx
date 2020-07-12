import React from 'react';
import { Flex, Text } from 'rebass';

type Props = {
  subElement?: JSX.Element | null;
};

export const ListText: React.FunctionComponent<Props> = ({
  children,
  subElement,
}) => {
  return (
    <Text lineHeight="1.5">
      {children}
      {subElement != null && <Flex sx={{ float: 'right' }}>{subElement}</Flex>}
    </Text>
  );
};
