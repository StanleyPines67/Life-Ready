import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { getCategory, courseEmoji, type Course } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

export const Route = createFileRoute("/category/$categorySlug")({
  loader: ({ params }) => {
    const category = getCategory(params.categorySlug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.category.title} — LifeReady` },
          { name: "description", content: loaderData.category.tagline },
          { property: "og:title", content: `${loaderData.category.title} — LifeReady` },
          { property: "og:description", content: loaderData.category.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-5 text-center">
      <div>
        <h1 className="font-display text-4xl">Category not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">Go home</Link>
      </div>
    </div>
  ),
  component: CategoryPage,
});

const tintMap: Record<string, string> = {
  transport: "bg-tint-transport",
  cooking: "bg-tint-cooking",
  money: "bg-tint-money",
  admin: "bg-tint-admin",
  life: "bg-tint-life",
  home: "bg-tint-home",
  tech: "bg-tint-tech",
  style: "bg-tint-style",
  career: "bg-tint-career",
  nonessential: "bg-tint-nonessential",
  housing: "bg-tint-housing",
  health: "bg-tint-health",
};

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { completedCourses, completedSteps } = useProgress();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-5 py-14">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        <div className="mt-6 flex items-start gap-5">
          <span className={`h-16 w-16 rounded-3xl ${tintMap[category.tint]} grid place-items-center text-3xl flex-shrink-0`}>
            {category.emoji}
          </span>
          <div>
            <h1 className="font-display text-5xl tracking-tight">{category.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{category.tagline}</p>
          </div>
        </div>

        <div className="mt-12 space-y-3">
          {category.courses.map((course: Course, idx: number) => {
            const id = `${category.slug}/${course.slug}`;
            const stepsDone = completedSteps[id]?.length ?? 0;
            const totalSteps = course.steps.length;
            const courseDone = completedCourses.includes(id);
            const pct = courseDone ? 100 : Math.round((stepsDone / totalSteps) * 100);

            return (
              <Link
                key={course.slug}
                to="/course/$categorySlug/$courseSlug"
                params={{ categorySlug: category.slug, courseSlug: course.slug }}
                className="group block rounded-2xl border border-border/70 bg-card p-5 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 min-w-0">
                    <span className="font-display text-2xl text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl flex-shrink-0 leading-none mt-0.5" aria-hidden>
                      {course.emoji ?? courseEmoji(course.slug, category.emoji)}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-xl tracking-tight">
                        {course.featured && <span aria-hidden>⭐ </span>}
                        {course.title}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">{course.duration} • {totalSteps} steps</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors" aria-hidden>→</span>
                </div>
                {pct > 0 && (
                  <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
