import { useEffect, useState, useCallback } from "react";

const KEY = "lifeready:rewards:v2";

export type ThemeId =
  | "warm"
  | "rose"
  | "forest"
  | "midnight"
  | "charcoal"
  | "ocean"
  | "plum"
  | "emerald"
  | "sunset";

export type ThemeMode = "light" | "dark";

export const THEMES: {
  id: ThemeId;
  name: string;
  cost: number;
  preview: string;
  mode: ThemeMode;
  blurb: string;
}[] = [
  { id: "warm", name: "Warm Clay", cost: 0, preview: "oklch(0.65 0.14 38)", mode: "light", blurb: "The original — terracotta and sage." },
  { id: "rose", name: "Soft Rose", cost: 0, preview: "oklch(0.7 0.13 18)", mode: "light", blurb: "Default. Calm pink-ish warmth." },
  { id: "forest", name: "Deep Forest", cost: 30, preview: "oklch(0.55 0.1 155)", mode: "light", blurb: "Mossy greens, focused vibe." },
  { id: "midnight", name: "Midnight Ink", cost: 60, preview: "oklch(0.55 0.15 265)", mode: "dark", blurb: "Indigo dark mode for late nights." },
  { id: "charcoal", name: "Charcoal & Gold", cost: 80, preview: "oklch(0.78 0.14 75)", mode: "dark", blurb: "Pure dark with a gold accent." },
  { id: "ocean", name: "Deep Ocean", cost: 90, preview: "oklch(0.6 0.14 200)", mode: "dark", blurb: "Underwater teal — submarine mode." },
  { id: "plum", name: "Velvet Plum", cost: 110, preview: "oklch(0.6 0.15 340)", mode: "dark", blurb: "Rich plum with magenta highlights." },
  { id: "emerald", name: "Emerald Night", cost: 120, preview: "oklch(0.6 0.15 155)", mode: "dark", blurb: "Forest-green dark mode." },
  { id: "sunset", name: "Last Light", cost: 140, preview: "oklch(0.65 0.16 45)", mode: "dark", blurb: "Burnt-orange dusk on dark." },
];

// ---- BOOSTS / ITEMS ----------------------------------------------------------
export type BoostId = "streak" | "double-coins" | "lucky-charm" | "course-skip";

export type ShopItem = {
  id: BoostId;
  name: string;
  emoji: string;
  cost: number;
  blurb: string;
  detail: string;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "streak",
    name: "Daily Streak Pass",
    emoji: "🔥",
    cost: 40,
    blurb: "Check in every day. Coins grow with the streak.",
    detail:
      "Day 1 → 1🪙, Day 2 → 2🪙, Day 3 → 3🪙… up to 10🪙/day. Miss a day and the streak resets to 1. Break-even is around day 9.",
  },
  {
    id: "double-coins",
    name: "Double Coin Day",
    emoji: "✨",
    cost: 25,
    blurb: "Next 24 hours: every course pays 2x.",
    detail: "Stack with featured-skill bonus for up to 30🪙 per essential.",
  },
  {
    id: "lucky-charm",
    name: "Lucky Charm",
    emoji: "🍀",
    cost: 60,
    blurb: "10% chance every course pays a bonus +5🪙. Permanent.",
    detail: "One-time purchase. Quietly tilts every reward in your favor.",
  },
  {
    id: "course-skip",
    name: "Skip Token",
    emoji: "⏭️",
    cost: 100,
    blurb: "Mark any one course complete without doing the steps.",
    detail: "Use sparingly — you bought knowledge, not the lesson.",
  },
];

type RewardsState = {
  coins: number;
  unlocked: ThemeId[];
  active: ThemeId;
  awardedFor: string[]; // courseIds we've already paid out for
  // boosts
  streakActive: boolean;
  streakCount: number;
  streakLastClaim: string | null; // ISO date YYYY-MM-DD
  doubleUntil: number | null; // epoch ms
  luckyCharm: boolean;
  skipTokens: number;
};

const empty: RewardsState = {
  coins: 0,
  unlocked: ["warm", "rose"],
  active: "rose",
  awardedFor: [],
  streakActive: false,
  streakCount: 0,
  streakLastClaim: null,
  doubleUntil: null,
  luckyCharm: false,
  skipTokens: 0,
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

const todayStr = () => new Date().toISOString().slice(0, 10);
const dayDiff = (a: string, b: string) => {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
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
      let amount = featured ? 15 : 10;
      if (cur.doubleUntil && Date.now() < cur.doubleUntil) amount *= 2;
      if (cur.luckyCharm && Math.random() < 0.1) amount += 5;
      persist({
        ...cur,
        coins: cur.coins + amount,
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

  // ---- Shop purchases ----
  const buyItem = useCallback(
    (id: BoostId): { ok: boolean; reason?: string } => {
      const cur = read();
      const item = SHOP_ITEMS.find((s) => s.id === id);
      if (!item) return { ok: false, reason: "Unknown item" };
      if (cur.coins < item.cost) return { ok: false, reason: "Not enough coins" };

      let next: RewardsState = { ...cur, coins: cur.coins - item.cost };
      if (id === "streak") {
        if (cur.streakActive) return { ok: false, reason: "Already active" };
        next = { ...next, streakActive: true, streakCount: 0, streakLastClaim: null };
      } else if (id === "double-coins") {
        next = { ...next, doubleUntil: Date.now() + 24 * 60 * 60 * 1000 };
      } else if (id === "lucky-charm") {
        if (cur.luckyCharm) return { ok: false, reason: "Already owned" };
        next = { ...next, luckyCharm: true };
      } else if (id === "course-skip") {
        next = { ...next, skipTokens: cur.skipTokens + 1 };
      }
      persist(next);
      return { ok: true };
    },
    [persist],
  );

  // Daily streak claim — call once per day from rewards page
  const claimStreak = useCallback((): { ok: boolean; awarded: number; reset: boolean } => {
    const cur = read();
    if (!cur.streakActive) return { ok: false, awarded: 0, reset: false };
    const today = todayStr();
    if (cur.streakLastClaim === today) return { ok: false, awarded: 0, reset: false };
    let nextStreak = 1;
    let reset = false;
    if (cur.streakLastClaim) {
      const d = dayDiff(cur.streakLastClaim, today);
      if (d === 1) nextStreak = cur.streakCount + 1;
      else if (d > 1) {
        reset = true;
        nextStreak = 1;
      }
    }
    const awarded = Math.min(nextStreak, 10);
    persist({
      ...cur,
      coins: cur.coins + awarded,
      streakCount: nextStreak,
      streakLastClaim: today,
    });
    return { ok: true, awarded, reset };
  }, [persist]);

  const useSkipToken = useCallback((): boolean => {
    const cur = read();
    if (cur.skipTokens <= 0) return false;
    persist({ ...cur, skipTokens: cur.skipTokens - 1 });
    return true;
  }, [persist]);

  const today = todayStr();
  const streakClaimedToday = state.streakLastClaim === today;
  const doubleActive = !!state.doubleUntil && Date.now() < state.doubleUntil;

  return {
    ...state,
    awardForCourse,
    unlockTheme,
    setActive,
    buyItem,
    claimStreak,
    useSkipToken,
    streakClaimedToday,
    doubleActive,
  };
}
