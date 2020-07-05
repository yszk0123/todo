import React from 'react';
import { Box, Flex } from 'rebass';

import { stopPropagation } from '../../../handlers/stopPropagation';

type Props = {
  leftElement?: JSX.Element | null;
  rightElement?: JSX.Element | null;
};

export const List: React.FunctionComponent<Props> = ({
  leftElement,
  rightElement,
  children,
}) => {
  const hasHeader = !!leftElement || !!rightElement;

  return (
    <Box
      mb={2}
      mt={hasHeader ? 3 : 1}
      pt={hasHeader ? 2 : 0}
      sx={{ boxShadow: hasHeader ? 1 : undefined, position: 'relative' }}
      onClick={stopPropagation}
    >
      {hasHeader && (
        <Flex
          color="gray"
          fontSize={2}
          justifyContent={
            leftElement
              ? rightElement
                ? 'space-between'
                : 'flex-start'
              : 'flex-end'
          }
          sx={{ position: 'absolute', top: -2 }}
          width={1}
        >
          {!!leftElement && <Box ml={2}>{leftElement}</Box>}
          {!!rightElement && <Box mr={2}>{rightElement}</Box>}
        </Flex>
      )}
      {children}
    </Box>
  );
};
