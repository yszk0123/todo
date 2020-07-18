import React from 'react';

import { FOOTER_ID } from '../constants/FOOTER_ID';

export function useFooter(): HTMLElement | null {
  const [footer, setFooter] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById(FOOTER_ID);
    setFooter(element);
  }, []);

  return footer;
}
