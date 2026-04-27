import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, allCourses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — LifeReady" },
      { name: "description", content: "Every LifeReady skill in one place. Filter by category, see what you've completed, pick what's next." },
      { property: "og:title", content: "Library — LifeReady" },
      { property: "og:description", content: "Every LifeReady skill in one place." },
    ],
  }),
  component: Library,
});

const tintMap: Record<string, string> = {
  transport: "bg-tint-transport",
  cooking: "bg-tint-cooking",
  money: "bg-tint-money",
  admin: "bg-tint-admin",
  life: "bg-tint-life",
};

function Library() {
  const { completedCourses } = useProgress();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-5xl w-full px-5 py-14">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Library</p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">All {allCourses.length} skills</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">Each one is a short, finishable lesson. Tap any to start.</p>

        <div className="mt-14 space-y-16">
          {categories.map((category) => (
            <section key={category.slug}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`h-10 w-10 rounded-2xl ${tintMap[category.tint]} grid place-items-center text-xl`}>
                  {category.emoji}
                </span>
                <div>
                  <h2 className="font-display text-2xl tracking-tight">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.tagline}</p>
                </div>
              </div>
              <ul className="divide-y divide-border/70 border border-border/70 rounded-2xl overflow-hidden bg-card">
                {category.courses.map((course) => {
                  const id = `${category.slug}/${course.slug}`;
                  const done = completedCourses.includes(id);
                  return (
                    <li key={course.slug}>
                      <Link
                        to="/course/$categorySlug/$courseSlug"
                        params={{ categorySlug: category.slug, courseSlug: course.slug }}
                        className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <span
                            className={`h-6 w-6 rounded-full border-2 grid place-items-center text-xs flex-shrink-0 ${
                              done
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-border"
                            }`}
                          >
                            {done && "✓"}
                          </span>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{course.title}</div>
                            <div className="text-xs text-muted-foreground">{course.duration} • {course.steps.length} steps</div>
                          </div>
                        </div>
                        <span className="text-muted-foreground" aria-hidden>→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
