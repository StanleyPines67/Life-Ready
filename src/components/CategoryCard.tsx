import { Link } from "@tanstack/react-router";
import type { Category } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

const tintMap: Record<Category["tint"], string> = {
  transport: "bg-tint-transport",
  cooking: "bg-tint-cooking",
  money: "bg-tint-money",
  admin: "bg-tint-admin",
  life: "bg-tint-life",
};

export function CategoryCard({ category }: { category: Category }) {
  const { completedCourses } = useProgress();
  const done = category.courses.filter((c) =>
    completedCourses.includes(`${category.slug}/${c.slug}`),
  ).length;
  const total = category.courses.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Link
      to="/category/$categorySlug"
      params={{ categorySlug: category.slug }}
      className="group relative block rounded-3xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className={`absolute top-6 right-6 h-12 w-12 rounded-2xl ${tintMap[category.tint]} grid place-items-center text-2xl`}>
        {category.emoji}
      </div>
      <div className="pr-16">
        <h3 className="font-display text-2xl tracking-tight">{category.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{category.tagline}</p>
      </div>
      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>{total} {total === 1 ? "skill" : "skills"}</span>
        <span>{done}/{total} done</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </Link>
  );
}
