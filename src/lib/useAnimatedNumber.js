import { useEffect, useRef, useState } from "react";

/**
 * Smoothly tweens a displayed number toward `value` whenever it changes.
 * Returns the in-progress value to render with your own formatter.
 */
export function useAnimatedNumber(value, duration = 650) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const target = Number.isFinite(value) ? value : 0;
    const from = Number.isFinite(fromRef.current) ? fromRef.current : 0;
    if (from === target) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    cancelAnimationFrame(rafRef.current);

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = from + (target - from) * eased;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}
