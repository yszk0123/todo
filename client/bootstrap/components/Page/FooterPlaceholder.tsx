import React from 'react';
import { Flex } from 'rebass';

import { FOOTER_ID } from '../../../shared/constants/FOOTER_ID';
import { EmptyProps } from '../../../view_models/EmptyProps';

export const FooterPlaceholder: React.FunctionComponent<EmptyProps> = () => {
  return (
    <Flex
      as="footer"
      id={FOOTER_ID}
      sx={{
        position: 'sticky',
        zIndex: 2,
        bottom: 0,
        boxShadow: 2,
      }}
    />
  );
};
