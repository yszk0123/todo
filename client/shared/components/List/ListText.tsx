import React from 'react';
import { Box, Flex, Text } from 'rebass';

type Props = {
  hasStrikeThrough?: boolean;
  subElement?: JSX.Element | null;
};

const ListText: React.ForwardRefRenderFunction<unknown, Props> = (
  { children, hasStrikeThrough = false, subElement },
  ref
) => {
  return (
    <Text
      lineHeight="1.5"
      ref={ref}
      sx={{
        textDecoration: hasStrikeThrough ? 'line-through double' : undefined,
      }}
    >
      <Box variant="listText">{children}</Box>
      {subElement != null && (
        <Flex color="secondaryText" sx={{ float: 'right' }}>
          {subElement}
        </Flex>
      )}
    </Text>
  );
};

const ForwardedListText = React.forwardRef(ListText);

export { ForwardedListText as ListText };
