import React from 'react';

export function useGlobalEscapeKey(
  onEscape: () => unknown,
  isEnabled: boolean
): void {
  const isCompositRef = React.useRef(false);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape' && !isCompositRef.current) {
        onEscape();
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [onEscape]
  );

  const handleCompositionStart = React.useCallback(() => {
    isCompositRef.current = true;
  }, [isCompositRef]);

  const handleCompositionEnd = React.useCallback(() => {
    isCompositRef.current = false;
  }, [isCompositRef]);

  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [handleCompositionEnd, handleCompositionStart, handleKeyDown, isEnabled]);
}
