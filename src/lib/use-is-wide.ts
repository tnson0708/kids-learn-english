import { useCallback, useSyncExternalStore } from "react";

/** True once the viewport is at least `px` wide; false during SSR. */
export function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

/** True from Tailwind's `sm` breakpoint (640px) up. */
export const useIsWide = () => useMinWidth(640);
