import React from 'react';
import { Box, Flex } from 'rebass';

import { stopPropagation } from '../../../handlers/stopPropagation';

type Props = {
  isFirst?: boolean;
  leftElement?: JSX.Element | null;
  rightElement?: JSX.Element | null;
};

export const List: React.FunctionComponent<Props> = ({
  leftElement,
  rightElement,
  isFirst = false,
  children,
}) => {
  const hadHeader = !!leftElement || !!rightElement;
  const extraMarginTop = isFirst ? 2 : 0;

  return (
    <Box
      mt={(hadHeader ? 3 : 1) + extraMarginTop}
      pt={hadHeader ? 2 : 0}
      sx={{ boxShadow: hadHeader ? 1 : undefined, position: 'relative' }}
      onClick={stopPropagation}
    >
      {hadHeader && (
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
