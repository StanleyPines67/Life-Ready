import { useEffect, useState, useCallback } from "react";

const KEY = "lifeready:rewards:v1";

export type ThemeId = "warm" | "rose" | "forest" | "midnight";

export const THEMES: { id: ThemeId; name: string; cost: number; preview: string }[] = [
  { id: "warm", name: "Warm Clay (default)", cost: 0, preview: "oklch(0.65 0.14 38)" },
  { id: "rose", name: "Soft Rose", cost: 0, preview: "oklch(0.7 0.13 18)" },
  { id: "forest", name: "Deep Forest", cost: 30, preview: "oklch(0.55 0.1 155)" },
  { id: "midnight", name: "Midnight Ink", cost: 60, preview: "oklch(0.45 0.12 265)" },
];

type RewardsState = {
  coins: number;
  unlocked: ThemeId[];
  active: ThemeId;
  awardedFor: string[]; // courseIds we've already paid out for
};

const empty: RewardsState = {
  coins: 0,
  unlocked: ["warm", "rose"],
  active: "rose",
  awardedFor: [],
};

const read = (): RewardsState => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function useRewards() {
  const [state, setState] = useState<RewardsState>(empty);

  useEffect(() => {
    setState(read());
    const sync = () => setState(read());
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  // apply theme as data attribute on <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", state.active);
  }, [state.active]);

  const persist = useCallback((next: RewardsState) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setState(next);
    notify();
  }, []);

  const awardForCourse = useCallback(
    (courseId: string, featured?: boolean) => {
      const cur = read();
      if (cur.awardedFor.includes(courseId)) return;
      persist({
        ...cur,
        coins: cur.coins + (featured ? 15 : 10),
        awardedFor: [...cur.awardedFor, courseId],
      });
    },
    [persist],
  );

  const unlockTheme = useCallback(
    (id: ThemeId) => {
      const cur = read();
      const theme = THEMES.find((t) => t.id === id);
      if (!theme || cur.unlocked.includes(id) || cur.coins < theme.cost) return false;
      persist({
        ...cur,
        coins: cur.coins - theme.cost,
        unlocked: [...cur.unlocked, id],
        active: id,
      });
      return true;
    },
    [persist],
  );

  const setActive = useCallback(
    (id: ThemeId) => {
      const cur = read();
      if (!cur.unlocked.includes(id)) return;
      persist({ ...cur, active: id });
    },
    [persist],
  );

  return { ...state, awardForCourse, unlockTheme, setActive };
}
