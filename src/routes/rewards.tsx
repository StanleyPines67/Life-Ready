import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { useRewards, THEMES } from "@/hooks/useRewards";
import { useProgress } from "@/hooks/useProgress";
import { allCourses, featuredCourses } from "@/data/courses";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Trophies & Themes — LifeReady" },
      { name: "description", content: "Earn coins by finishing skills. Unlock new themes." },
    ],
  }),
  component: Rewards,
});

function Rewards() {
  const { coins, unlocked, active, unlockTheme, setActive } = useRewards();
  const { completedCourses } = useProgress();

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
          <h2 className="font-display text-2xl tracking-tight">Themes</h2>
          <p className="text-sm text-muted-foreground mt-1">Spend coins to unlock.</p>
          <div className="mt-5 space-y-3">
            {THEMES.map((t) => {
              const isUnlocked = unlocked.includes(t.id);
              const isActive = active === t.id;
              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-border/70 bg-card p-5 flex items-center gap-4"
                >
                  <span
                    className="h-12 w-12 rounded-2xl flex-shrink-0"
                    style={{ background: t.preview }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {isUnlocked ? "Unlocked" : `Costs ${t.cost} coins`}
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
        </section>
      </main>
    </div>
  );
}
