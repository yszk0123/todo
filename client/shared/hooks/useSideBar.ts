import React from 'react';

import { SIDE_BAR_ID } from '../constants/SIDE_BAR_ID';

export function useSideBar(): HTMLElement | null {
  const [sideBar, setSideBar] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = document.getElementById(SIDE_BAR_ID);
    setSideBar(element);
  }, []);

  return sideBar;
}
