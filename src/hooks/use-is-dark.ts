import { useSyncExternalStore } from "react";

const QUERY = "(prefers-color-scheme: dark)";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

/**
 * Whether the OS colour scheme is dark — mirrors the `dark` class that
 * index.html keeps on <html>, so third-party widgets can follow the theme.
 */
export function useIsDark(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
