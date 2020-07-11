import React from 'react';
import { Box, Flex } from 'rebass';

import { stopPropagation } from '../../helpers/stopPropagation';

type Props = {
  leftElement?: JSX.Element | null;
  rightElement?: JSX.Element | null;
  variant?: string;
};

export const List: React.FunctionComponent<Props> = ({
  children,
  leftElement,
  rightElement,
  variant = 'gray',
}) => {
  const hasHeader = !!leftElement || !!rightElement;

  return (
    <Box
      mb={2}
      mt={hasHeader ? 3 : 1}
      pt={hasHeader ? 1 : 0}
      sx={{
        border: hasHeader ? '1px solid' : undefined,
        borderColor: hasHeader ? variant : undefined,
        borderRadius: hasHeader ? 4 : undefined,
        boxShadow: hasHeader ? 1 : undefined,
        position: 'relative',
      }}
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
          {!!leftElement && (
            <Box bg="background" ml={2} px={1}>
              {leftElement}
            </Box>
          )}
          {!!rightElement && (
            <Box bg="background" mr={2} px={1}>
              {rightElement}
            </Box>
          )}
        </Flex>
      )}
      {children}
    </Box>
  );
};
