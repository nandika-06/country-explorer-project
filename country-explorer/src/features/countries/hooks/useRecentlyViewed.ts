import { useEffect } from "react";

const RECENT_KEY = "ge_recently_viewed";
const MAX_RECENT = 10;

function readRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function useTrackRecentlyViewed(code?: string) {
  useEffect(() => {
    if (!code) return;

    const current = readRecent();
    const without = current.filter((c) => c !== code);
    const updated = [code, ...without].slice(0, MAX_RECENT);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  }, [code]);
}
