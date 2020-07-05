import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { stopPropagation } from '../../../handlers/stopPropagation';

type Props = {
  isFirst?: boolean;
  headerText?: string;
};

export const List: React.FunctionComponent<Props> = ({
  headerText,
  isFirst = false,
  children,
}) => {
  const hadHeader = !!headerText;
  const extraMarginTop = isFirst ? 2 : 0;

  return (
    <Box
      fontSize={2}
      mt={(hadHeader ? 3 : 1) + extraMarginTop}
      pt={hadHeader ? 2 : 0}
      sx={{ boxShadow: hadHeader ? 1 : undefined, position: 'relative' }}
      onClick={stopPropagation}
    >
      {hadHeader && (
        <Flex
          justifyContent="flex-end"
          sx={{ position: 'absolute', top: -2, right: 2 }}
          width={1}
        >
          <Text color="gray">{headerText}</Text>
        </Flex>
      )}
      {children}
    </Box>
  );
};
