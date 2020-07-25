import React from 'react';

import { isKeyCode, KeyCode } from '../constants/KeyCode';

export type Shortcut = {
  alt: boolean;
  cmd: boolean;
  code: KeyCode;
  ctrl: boolean;
  shift: boolean;
};

const INPUT_TAGS = ['input', 'textarea', 'select'];

function isInputElement(element: EventTarget | null): boolean {
  return (
    element instanceof HTMLElement &&
    INPUT_TAGS.includes(element.tagName.toLowerCase())
  );
}

type ShortcutHandler = (shortcut: Shortcut) => void;

export function useGlobalShortcut(
  onShortcut: ShortcutHandler,
  isEnabled = true
): void {
  const isCompositRef = React.useRef(false);
  const onShortcutRef = React.useRef(onShortcut);
  onShortcutRef.current = onShortcut;

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (isCompositRef.current) {
        return;
      }

      const code = event.code;
      if (!isKeyCode(code)) {
        return;
      }

      if (isInputElement(event.target)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const shortcut: Shortcut = {
        code,
        shift: event.shiftKey,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        cmd: event.metaKey,
      };
      onShortcutRef.current(shortcut);
    },
    [onShortcutRef]
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
