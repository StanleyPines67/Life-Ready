import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useRewards, THEMES, SHOP_ITEMS } from "@/hooks/useRewards";
import { useProgress } from "@/hooks/useProgress";
import { allCourses, featuredCourses } from "@/data/courses";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Trophies & Themes — LifeReady" },
      { name: "description", content: "Earn coins by finishing skills. Unlock themes and boosts." },
    ],
  }),
  component: Rewards,
});

function Rewards() {
  const {
    coins,
    unlocked,
    active,
    unlockTheme,
    setActive,
    buyItem,
    claimStreak,
    streakActive,
    streakCount,
    streakClaimedToday,
    doubleActive,
    luckyCharm,
    skipTokens,
  } = useRewards();
  const { completedCourses } = useProgress();
  const [flash, setFlash] = useState<string | null>(null);

  const showFlash = (msg: string) => {
    setFlash(msg);
    window.setTimeout(() => setFlash(null), 2200);
  };

  const total = allCourses.length;
  const done = completedCourses.length;
  const featuredDone = featuredCourses.filter((c) =>
    completedCourses.includes(`${c.categorySlug}/${c.slug}`),
  ).length;

  const trophies = [
    { id: "first", label: "First skill", emoji: "🌱", earned: done >= 1 },
    { id: "five", label: "5 skills", emoji: "🔥", earned: done >= 5 },
    { id: "ten", label: "10 skills", emoji: "⭐", earned: done >= 10 },
    { id: "featured", label: "3 essentials", emoji: "🏅", earned: featuredDone >= 3 },
    { id: "half", label: "Halfway", emoji: "🎯", earned: done >= Math.ceil(total / 2) },
    { id: "all", label: "Life Ready", emoji: "👑", earned: done === total && total > 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-5 py-14">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Rewards</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">Trophies & themes</h1>

        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Your coins</div>
            <div className="font-display text-4xl text-primary">🪙 {coins}</div>
          </div>
          <div className="text-sm text-muted-foreground text-right">
            Earn 10/skill · 15/⭐ essential
          </div>
        </div>

        {flash && (
          <div className="mt-4 rounded-2xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm">
            {flash}
          </div>
        )}

        {/* BOOSTS / SHOP ITEMS */}
        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Boosts & items</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Spend coins on advantages. The streak pays you back if you actually show up.
          </p>

          {streakActive && (
            <div className="mt-5 rounded-3xl border border-primary/30 bg-primary-soft p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-display text-xl">🔥 Day {streakCount || 0} streak</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tomorrow's reward: 🪙 {Math.min((streakCount || 0) + 1, 10)}.
                  Miss a day and it resets to 1.
                </div>
              </div>
              <button
                type="button"
                disabled={streakClaimedToday}
                onClick={() => {
                  const r = claimStreak();
                  if (r.ok) showFlash(`+${r.awarded} 🪙 — day ${r.reset ? 1 : streakCount + 1}`);
                }}
                className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                {streakClaimedToday ? "Claimed today ✓" : "Claim today"}
              </button>
            </div>
          )}

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {SHOP_ITEMS.map((item) => {
              const owned =
                (item.id === "streak" && streakActive) ||
                (item.id === "lucky-charm" && luckyCharm);
              const ownedCount = item.id === "course-skip" ? skipTokens : 0;
              const ongoing = item.id === "double-coins" && doubleActive;
              const disableBuy = owned || coins < item.cost;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/70 bg-card p-5 flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl" aria-hidden>{item.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.blurb}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {owned ? "Owned" : ongoing ? "Active" : ownedCount > 0 ? `Owned ×${ownedCount}` : `🪙 ${item.cost}`}
                    </span>
                    <button
                      type="button"
                      disabled={disableBuy}
                      onClick={() => {
                        const r = buyItem(item.id);
                        if (r.ok) showFlash(`Bought ${item.name}.`);
                        else if (r.reason) showFlash(r.reason);
                      }}
                      className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40"
                    >
                      {owned ? "Owned" : "Buy"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Trophies</h2>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {trophies.map((t) => (
              <div
                key={t.id}
                className={`rounded-2xl border p-4 text-center ${
                  t.earned
                    ? "bg-primary-soft border-primary/40"
                    : "bg-card border-border/70 opacity-60"
                }`}
              >
                <div className="text-3xl">{t.emoji}</div>
                <div className="mt-2 text-sm font-medium">{t.label}</div>
                <div className="text-xs text-muted-foreground">
                  {t.earned ? "Earned" : "Locked"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl tracking-tight">Theme shop</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Spend coins to unlock. All dark themes are tested for legibility.
          </p>

          {(["light", "dark"] as const).map((mode) => {
            const themes = THEMES.filter((t) => t.mode === mode);
            return (
              <div key={mode} className="mt-8">
                <h3 className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  {mode === "light" ? "☀ Light themes" : "🌙 Dark themes"}
                </h3>
                <div className="space-y-3">
                  {themes.map((t) => {
                    const isUnlocked = unlocked.includes(t.id);
                    const isActive = active === t.id;
                    return (
                      <div
                        key={t.id}
                        className="rounded-2xl border border-border/70 bg-card p-5 flex items-center gap-4"
                      >
                        <span
                          className="h-12 w-12 rounded-2xl flex-shrink-0 border border-border/40"
                          style={{ background: t.preview }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium flex items-center gap-2">
                            {t.name}
                            {t.cost === 0 && (
                              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                                Free
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {t.blurb}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {isUnlocked ? "Unlocked" : `🪙 ${t.cost}`}
                          </div>
                        </div>
                        {isActive ? (
                          <span className="text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
                            Active
                          </span>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => setActive(t.id)}
                            className="text-sm px-4 py-2 rounded-full border border-border hover:bg-secondary"
                          >
                            Use
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockTheme(t.id)}
                            disabled={coins < t.cost}
                            className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground disabled:opacity-40"
                          >
                            Unlock
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
