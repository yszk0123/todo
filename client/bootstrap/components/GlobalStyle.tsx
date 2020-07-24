import React from 'react';

import { FONT_FAMILY } from '../../shared/theme/theme';
import { EmptyProps } from '../../view_models/EmptyProps';

export const GlobalStyle: React.FunctionComponent<EmptyProps> = () => {
  React.useEffect(() => {
    navigator.userAgent.search('Safari') >= 0;
  }, []);

  return (
    <style global jsx>{`
      html {
        font-family: ${FONT_FAMILY};
      }

      /* FIXME: In webkit, outline is not clear completely after focusout */
      @media only screen and (max-device-width: 768px) {
        body *:focus {
          outline: 2px solid skyblue;
          outline-offset: -2px;
        }
      }
    `}</style>
  );
};
