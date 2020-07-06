import React from 'react';

type Callback = () => void;

export function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = React.useRef<Callback>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const handler = () => {
      savedCallback.current?.();
    };

    if (delay !== null) {
      const timerId = setInterval(handler, delay);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [delay]);
}
