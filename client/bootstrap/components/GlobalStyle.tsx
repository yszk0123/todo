import React from 'react';

import { FONT_FAMILY } from '../../shared/theme/theme';
import { EmptyProps } from '../../viewModels/EmptyProps';

export const GlobalStyle: React.FunctionComponent<EmptyProps> = () => {
  return (
    <style global jsx>{`
      html {
        font-family: ${FONT_FAMILY};
      }
    `}</style>
  );
};
