import React from 'react';

import { FONT_FAMILY } from '../../shared/theme/theme';
import { EmptyProps } from '../../view_models/EmptyProps';

export const GlobalStyle: React.FunctionComponent<EmptyProps> = () => {
  return (
    <style global jsx>{`
      html {
        font-family: ${FONT_FAMILY};
      }
    `}</style>
  );
};
