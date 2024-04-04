import { useRef, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number = 1000
) {
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      if (!timer.current) {
        return;
      }

      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);

    clearTimeout(timer.current);

    timer.current = newTimer;
  }) as F;

  return debouncedFunction;
}
