import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, allCourses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LifeReady — Real-life skills, in 10 minutes a day" },
      { name: "description", content: "Bite-sized, practical courses for the real-world skills no one taught you: taxes, cars, cooking, leases, and the systems behind adult life." },
      { property: "og:title", content: "LifeReady — Real-life skills, in 10 minutes a day" },
      { property: "og:description", content: "Bite-sized, practical courses for the real-world skills no one taught you." },
    ],
  }),
  component: Index,
});

function Index() {
  const { completedCourses } = useProgress();
  const totalCourses = allCourses.length;
  const done = completedCourses.length;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="mx-auto max-w-5xl px-5 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground bg-card/70 backdrop-blur px-3 py-1.5 rounded-full border border-border/60">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                The handbook nobody handed you
              </span>
              <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
                Real-life skills,<br />
                <em className="not-italic text-primary">one calm step</em> at a time.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                LifeReady turns the scary parts of adult life — taxes, flat tires, leases, first kitchens — into short, do-this-today lessons. No jargon. No shame.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/library"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-soft)]"
                >
                  Browse the library
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/category/$categorySlug"
                  params={{ categorySlug: "money" }}
                  className="inline-flex items-center px-6 py-3.5 rounded-full bg-card border border-border text-foreground font-medium hover:bg-secondary transition-colors"
                >
                  Start with taxes
                </Link>
              </div>
              <dl className="mt-12 flex gap-8 text-sm">
                <div>
                  <dt className="text-muted-foreground">Skills</dt>
                  <dd className="font-display text-2xl text-foreground">{totalCourses}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Average</dt>
                  <dd className="font-display text-2xl text-foreground">7 min</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">You've done</dt>
                  <dd className="font-display text-2xl text-primary">{done}</dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-5">
              <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-border/60 shadow-[var(--shadow-elevated)]">
                <img
                  src={heroImg}
                  alt="A young person calmly handling everyday adult tasks"
                  width={1280}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-5xl px-5 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.18em]">Categories</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight">Where would you like to start?</h2>
            </div>
            <Link to="/library" className="hidden md:inline text-sm text-primary hover:underline underline-offset-4">
              See everything →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-secondary/40 border-y border-border/60">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <h2 className="font-display text-4xl tracking-tight max-w-2xl">A small, repeatable shape for every skill.</h2>
            <div className="mt-12 grid md:grid-cols-4 gap-8">
              {[
                { n: "01", t: "Why it matters", d: "Two sentences. The cost of not knowing this." },
                { n: "02", t: "Steps", d: "A short, ordered checklist you can follow on the spot." },
                { n: "03", t: "What to avoid", d: "The mistakes that turn a small task into a big one." },
                { n: "04", t: "One question", d: "A quick check that the lesson actually stuck." },
              ].map((s) => (
                <div key={s.n}>
                  <div className="font-display text-3xl text-primary">{s.n}</div>
                  <h3 className="mt-3 font-display text-xl">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-5xl px-5 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© LifeReady — built to reduce adulting anxiety.</p>
          <p>Prototype • Local progress only</p>
        </div>
      </footer>
    </div>
  );
}
