import React from 'react';

export function useGlobalKeyboard<T extends keyof WindowEventMap>(
  key: T,
  listener: (event: WindowEventMap[T]) => unknown,
  isEnabled = true
): void {
  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    window.addEventListener(key, listener);
    return () => {
      window.removeEventListener(key, listener);
    };
  }, [listener, isEnabled, key]);
}
