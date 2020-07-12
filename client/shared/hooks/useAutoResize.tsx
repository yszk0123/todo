import React from 'react';
import { Box } from 'rebass';

import { EmptyProps } from '../../view_models/EmptyProps';

type Rect = {
  height: number;
  width: number;
};

function isValidRect({ height, width }: Rect): boolean {
  return width > 0 && width <= 10000 && height > 0 && height <= 10000;
}

export function useAutoResize(): {
  AutoResizeBox: React.FunctionComponent<EmptyProps>;
  rect: Rect | null;
} {
  const [rect, setRect] = React.useState<Rect | null>(null);
  const callbackRef = React.useCallback((element: HTMLElement | null) => {
    if (!element) {
      return;
    }
    const { height, width } = element.getBoundingClientRect();
    const rect = { width, height };
    if (isValidRect(rect)) {
      setRect(rect);
    }
  }, []);

  const AutoResizeBox = React.useMemo(() => {
    const Component: React.FunctionComponent<EmptyProps> = ({ children }) => (
      <Box ref={callbackRef} width={1}>
        {children}
      </Box>
    );
    return Component;
  }, [callbackRef]);

  return { AutoResizeBox, rect };
}
